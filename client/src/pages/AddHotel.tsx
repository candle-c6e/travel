import { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/Button";
import "mapbox-gl/dist/mapbox-gl.css";
import ImageList from "../components/ImageList";
import FileInput from "../components/FileInput";
// import MapBox from "../components/Mapbox";
import {
  Hotels,
  HotelsDocument,
  useAddHotelMutation,
  useMultiUploadMutation,
} from "../generated/graphql";

interface Input {
  name: string;
  bio: string;
  address: string;
  price: number;
  latitude: number;
  longitude: number;
}

type Cache = {
  hotels: {
    hotels: Hotels[];
  };
};

const AddHotel = () => {
  const history = useHistory();
  const [images, setImages] = useState<File[]>([]);
  const [longitude, setLongitude] = useState<number>(100.53538958416028);
  const [latitude, setLatitude] = useState<number>(13.747164402978903);

  const imageListRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, errors } = useForm<Input>();
  const [uploads] = useMultiUploadMutation();
  const [addHotel] = useAddHotelMutation();

  const handleImage = (image: File) => {
    setImages([...images, image]);

    if (imageListRef.current && imageListRef.current !== null) {
      imageListRef.current.scrollTo({
        top: 0,
        left: imageListRef.current.scrollWidth,
        behavior: "smooth",
      });
    }
  };

  const handleRemoveImage = (image: File) => {
    const newImage = images.filter((imageState) => imageState !== image);
    setImages(newImage);
  };

  const onSubmit = async (input: Input) => {
    if (!images.length) return;

    const uploaded = await uploads({
      variables: {
        files: images,
        type: "hotel",
      },
    });

    if (uploaded.data?.multiUpload.length) {
      const { data } = await addHotel({
        variables: {
          hotelInput: {
            name: input.name,
            bio: input.bio,
            address: input.address,
            latitude,
            longitude,
            price: +input.price,
            images: uploaded.data?.multiUpload,
          },
        },
        update: (cache, { data: addHotel }) => {
          const resultHotels = cache.readQuery<Cache>({
            query: HotelsDocument,
          });
          if (resultHotels?.hotels) {
            const newCache = [...resultHotels.hotels.hotels, addHotel];
            cache.writeQuery({
              query: HotelsDocument,
              data: {
                hotels: newCache,
              },
            });
          }
        },
      });

      if (data?.addHotel) {
        history.push("/");
      }
    }
  };

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <input
            name="name"
            placeholder="Name"
            ref={register({ required: true, minLength: 3 })}
          />
          {errors.name && (
            <ErrorMessage>
              {errors.name.type === "required"
                ? "Name is required"
                : "Name should be at least 3 characters long "}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <textarea name="bio" rows={5} placeholder="Bio" ref={register()} />
        </FormGroup>
        <FormGroup>
          <textarea
            name="address"
            rows={5}
            placeholder="Address"
            ref={register({ required: true, minLength: 10 })}
          />
          {errors.address && (
            <ErrorMessage>
              {errors.address.type === "required"
                ? "Address is required"
                : "Address should be at least 10 characters long "}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <input
            name="price"
            placeholder="Price"
            ref={register({
              required: true,
              pattern: {
                value: /[0-9]/,
                message: "Price is allow number only",
              },
            })}
          />
          {errors.price && (
            <ErrorMessage>
              {errors.price.type === "required"
                ? "Price is required."
                : "Price is allow number Only"}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <input
            defaultValue={latitude}
            name="latitude"
            placeholder="Latitude"
            ref={register({
              required: true,
              pattern: {
                value: /[0-9]{2}\.{1}\d/,
                message: "Latitude is not valid",
              },
            })}
          />
          {errors.latitude && (
            <ErrorMessage>
              {errors.latitude.type === "required"
                ? "Latitude is required."
                : "Latitude is not valid"}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup>
          <input
            defaultValue={longitude}
            name="longitude"
            placeholder="Longitude"
            ref={register({
              required: true,
              pattern: {
                value: /[0-9]{2}\.{1}\d/,
                message: "Longitude is not valid",
              },
            })}
          />
          {errors.longitude && (
            <ErrorMessage>
              {errors.longitude.type === "required"
                ? "Longitude is required."
                : "Latitude is not valid"}
            </ErrorMessage>
          )}
        </FormGroup>
        <FormGroup className="image-list" ref={imageListRef}>
          <ImageList images={images} handleRemoveImage={handleRemoveImage} />
          <FileInput onChange={(image) => handleImage(image)} />
        </FormGroup>
        <Button type="submit" isLoading={false} text="Add Hotel" />
      </form>
      {/* <MapBox
        latitude={latitude}
        longitude={longitude}
        setLatitude={setLatitude}
        setLongitude={setLongitude}
      /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
`;

const FormGroup = styled.div`
  margin-bottom: 2rem;

  &.image-list {
    display: flex;
    max-width: 500px;
    overflow: scroll;
  }
`;

export default AddHotel;
