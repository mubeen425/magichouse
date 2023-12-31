import React, { useState, useCallback } from "react";
import "./YourComponent.css";
import { Row, Col, Button, Container } from "react-bootstrap";
import apiClient from "../../api/apiClient";
import useApi from "../../hooks/useApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingOverlay from "../LoadingOverlay";
import { useDropzone } from "react-dropzone";
const RedesignComponent = () => {
  const [selectedImage, setSelectedImage] = useState();
  const [resultData, setResultData] = useState();
  const [uploadedImage, setuploadedImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [selectedImagesPreview, setSelectedImagesPreview] = useState([]);
  const [selectedRoomType, setSelectedRoomType] = useState("");
  const [apiResponseImages, setApiResponseImages] = useState([]);



  const [imageGridData, setImageGridData] = useState([
    {
      id: "Image 1",
      src: process.env.PUBLIC_URL + "/image5.png",
      name: "Modern",
    },
    {
      id: "Image 2",
      src: process.env.PUBLIC_URL + "/image6.png",
      name: "Minimalist",
    },
    {
      id: "Image 3",
      src: process.env.PUBLIC_URL + "/image7.png",
      name: "Professional",
    },
    {
      id: "Image 4",
      src: process.env.PUBLIC_URL + "/image 8.png",
      name: "Tropical",
    },
    {
      id: "Image 5",
      src: process.env.PUBLIC_URL + "/image 9.png",
      name: "Coastal",
    },
    {
      id: "Image 6",
      src: process.env.PUBLIC_URL + "/image10.png",
      name: "Vintage",
    },
    {
      id: "Image 7",
      src: process.env.PUBLIC_URL + "/image11.png",
      name: "Industrial",
    },
    {
      id: "Image 8",
      src: process.env.PUBLIC_URL + "/image12.png",
      name: "Neoclassic",
    },
    {
      id: "Image 9",
      src: process.env.PUBLIC_URL + "/image7.png",
      name: "Tribal",
    },
  ]);
  const rows = [];
  for (let i = 0; i < imageGridData?.length; i += 3) {
    const row = imageGridData.slice(i, i + 3);
    rows.push(row);
  }

  const [draggedImage, setDraggedImage] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles, e) => {
      const file = acceptedFiles[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (file.type.startsWith("image/")) {
            setDraggedImage(e.target.result);
            setSelectedImage(e.target.result);
            setuploadedImage(file);
          } else {
            toast.error("Invalid file type. Please upload an image.");
          }
        };
        reader.readAsDataURL(file);
      }
    },
    accept: "image/*",
  });
  const toggleImageSelection = (imageId) => {
    const updatedSelectedImages = [...selectedImages];
    const updatedSelectedImagesPreview = [...selectedImagesPreview];
    const imageIndex = updatedSelectedImages.indexOf(imageId);
    const imageGridItem = imageGridData.find((data) => data.name === imageId);

    if (imageIndex !== -1) {
      updatedSelectedImages.splice(imageIndex, 1);
      updatedSelectedImagesPreview.splice(imageIndex, 1);
    } else {
      if (updatedSelectedImages?.length < 1) {
        updatedSelectedImages.push(imageId);
        updatedSelectedImagesPreview.push(imageGridItem);
      }
    }
    setSelectedImages(updatedSelectedImages);
    setSelectedImagesPreview(updatedSelectedImagesPreview);
    setResultData(null);
  };

  const handleUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (file.type.startsWith("image/")) {
          setDraggedImage(reader.result);
          setSelectedImage(reader.result);
          setuploadedImage(file);
        } else {
          toast.error("Invalid file type. Please upload an image.");
        }
      };
      reader.readAsDataURL(file);
    }
  };







  function handleDownloadAllImages() {
    // Create a temporary container element
    const container = document.createElement("div");
    container.style.display = "none";
    apiResponseImages?.forEach((imageUrl, index) => {
      if (imageUrl) {
        // If the image URL is defined, create an anchor element for download
        const anchor = document.createElement("a");
        anchor.href = imageUrl;
        anchor.download = `image_${index + 1}.png`;
        anchor.style.display = "none";
        container.appendChild(anchor);
        anchor.click();
      } else {
        // If the image URL is undefined, show an alert
        handleAlert(
          `Image ${index + 1} is undefined and cannot be downloaded.`
        );
      }
    });

    // Clean up the temporary container element
    document.body.appendChild(container);
    container.remove();
  }

  const { request, loading } = useApi((data) =>
    apiClient.post("/interior", data)
  );
  const handleAlert = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };
  async function handleSubmit() {
    if (selectedImages?.length === 0) {
      handleAlert("Please select at least one photo before rendering designs.");
      return;
    }
    if (!uploadedImage) {
      handleAlert("Please upload an image before submitting the form.");
      return;
    }

    const formdata = new FormData();
    formdata.append("image", uploadedImage);
    formdata.append("themes", JSON.stringify(selectedImages));
    formdata.append("room", selectedRoomType);

    try {
      const result = await request(formdata);
      if (result.data.status == "false") {
        toast.success(result?.data?.result?.filteredResponses)
      } else if (result.data.status == "true") {
        setApiResponseImages(result?.data?.result?.filteredResponses);
        setResultData(result?.data?.result?.filteredResponses);
        localStorage.setItem(
          "googleUser",
          JSON.stringify(result?.data?.result?.updatedUser)
        );
      }

    } catch (error) {
    }
  }
  const containerStyle = {
    alignItems: "center",
    border: "1px dotted black",
    borderRadius: "10px",
    borderStyle: "solid",
  };

  const responsiveContainerStyle = {
    ...containerStyle,
    width: "100%",
    marginRight: "5.4rem",
  };
  return (
    <div className="container">
      <div className="row" style={{ marginTop: "5rem" }}>
        <LoadingOverlay open={loading} />

        <div className="col-xl-4   col-lg-4  col-md-12 col-sm-12 col-xs-12">
          <div className="left-box ">
            <div
              style={
                window.innerWidth <= 768
                  ? responsiveContainerStyle
                  : containerStyle
              }
            >
              <div
                style={
                  window.innerWidth <= 768
                    ? responsiveContainerStyle
                    : containerStyle
                }
              >
                <div>
                  {selectedImage ? (
                    <div className="uploaded-image  rounded">
                      <img
                        src={selectedImage}
                        alt="Uploaded"
                        style={{
                          width: "100%",
                          padding: "32px 10px 10px 10px",
                        }}
                        className="rounded"
                      />
                      {selectedImage && (
                        <>
                          <button
                            className="delete-image-button"
                            style={{
                              position: "absolute",
                              right: "25px",
                              top: "61px",
                              background: "none",
                              border: "none",
                              color: "red",
                            }}
                            onClick={() => {
                              setSelectedImage(null);
                              setuploadedImage(null);
                            }}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-trash-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                            </svg>
                          </button>
                          <p
                            style={{
                              position: "absolute",
                              left: "34px",
                              top: "61px",
                            }}
                          >
                            Original Room
                          </p>
                        </>
                      )}
                    </div>
                  ) : (
                    <div className="mb-5">
                      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }} {...getRootProps()}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          style={{ marginTop: "1rem" }}
                          fill="#009FE3"
                          class="bi bi-cloud-upload"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M4.406 1.342A5.53 5.53 0 0 1 8 0c2.69 0 4.923 2 5.166 4.579C14.758 4.804 16 6.137 16 7.773 16 9.569 14.502 11 12.687 11H10a.5.5 0 0 1 0-1h2.688C13.979 10 15 8.988 15 7.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 2.825 10.328 1 8 1a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 4.805 1 5.952 1 7.318 1 8.785 2.23 10 3.781 10H6a.5.5 0 0 1 0 1H3.781C1.708 11 0 9.366 0 7.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M7.646 4.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707V14.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3z"
                          />
                        </svg>{" "}

                        <span>Drag and drop Your Image</span>
                        <span>or</span>
                      </div>
                      <input id="upload" type="file" style={{ display: 'none' }} onChange={handleUpload} />
                      <label className="upload-button" htmlFor="upload">
                        Upload Photo
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-3">
              {" "}
              <span> Select Room type</span>
            </p>

            <div className="dropdown-container">
              <select
                className="dropdown"
                onChange={(e) => setSelectedRoomType(e.target.value)}
              >
                <option value="Living Room">Living Room</option>
                <option value="Dining Room">Dining Room</option>
                <option value="BedRoom">BedRoom</option>
                <option value="Bath Room">Bath Room</option>
                <option value="Office">Office</option>
                <option value="Kitchen">Kitchen</option>
                <option value="Basement">Basement</option>
                <option value="Arabian Majilis">Arabian Majilis</option>
                <option value="Outdoor Patio">Outdoor Patio</option>
                <option value="Gaming Room">Gaming Room </option>
              </select>
            </div>
            <p className="mt-3">
              <span>Select Room Themes (up to 1) </span>
            </p>
            <ImageGrid
              rows={rows}
              selectedImages={selectedImages}
              handleSubmit={handleSubmit}
              toggleImageSelection={toggleImageSelection}
            />
          </div>
        </div>
        <div className="col-xl-8  col-lg-8  col-md-12 col-sm-12 col-xs-12">
          <div className="right-box">
            <div className="flex flex-col justify-center items-center">
              {selectedImagesPreview?.map((imageData, index) => (
                <Col key={imageData?.id} sm={6}>
                  <div className="selected-image">
                    {resultData?.length > 0 ? (
                      <img
                        src={resultData[index] || ""}
                        alt={"Image " + (index + 1)}
                        className="img-fluid"
                        style={{
                          width: "100%",
                          height: "18rem",
                          marginTop: "0.5rem",
                        }}
                      />
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center bg-dark rounded"
                        style={{
                          width: "100%",
                          height: "18rem",
                          marginTop: "0.5rem",
                        }}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL + "/MMH_logo-removebg.png"
                          }
                          alt={imageData.name}
                          className="img-fluid"
                          style={{
                            width: "12rem",
                          }}
                        />
                      </div>
                    )}
                    <div className="image-text" style={{ marginTop: "1.9rem" }}>
                      <span style={{ marginLeft: "2px" }}>
                        {imageData.name + " "}
                      </span>
                      {selectedRoomType ? selectedRoomType : "Living Room"}
                    </div>
                  </div>
                </Col>
              ))}
              {apiResponseImages?.length > 0 && (
                <Col>
                  <button onClick={handleDownloadAllImages} className="bo mt-5">
                    Download Image
                  </button>
                </Col>
              )}
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};
export default RedesignComponent;

const ImageGrid = ({
  rows,
  selectedImages,
  toggleImageSelection,
  handleSubmit,
}) => (
  <div className="image-grid">
    {rows.map((row, rowIndex) => (
      <Row key={rowIndex} className="image-row">
        {row.map((imageData) => (
          <Col key={imageData.id} xl={4} lg={4} md={4} sm={1} className="image-container">
            <div className="image-wrapper">
              <img
                src={imageData.src}
                alt={imageData.name}
                onClick={() => toggleImageSelection(imageData.name)}
                className={`img-fluid ${selectedImages?.includes(imageData.name)
                  ? "selected-image"
                  : ""
                  }`}
              />
              {selectedImages?.includes(imageData.name) && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="white"
                  className="svg-icon"
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                </svg>
              )}
              <div className="image-text">{imageData.name}</div>
            </div>
          </Col>
        ))}
      </Row>
    ))}

    <Row className="render">
      <Col>
        <Button onClick={handleSubmit} className="bo">
          RENDER DESIGNS
        </Button>
        <span style={{ color: "red" }} className="credits">Cost : {selectedImages?.length}</span>
      </Col>
      <ToastContainer />
    </Row>
  </div>
);
