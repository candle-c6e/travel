import { useEffect, useRef, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  useHotelLazyQuery,
  useUpdateHotelMutation,
  useMultiUploadMutation,
  useDeleteHotelImageMutation,
} from "../generated/graphql";
import FullPageSpinner from "../components/FullPageSpinner";

interface Input {
  name: string;
  bio: string;
  address: string;
  price: number;
  latitude: number;
  longitude: number;
}

interface Cache {
  hotels: Hotels[];
}

interface Params {
  id: string;
}

const EditHotel = () => {
  const params = useParams<Params>();
  const history = useHistory();
  const [images, setImages] = useState<any>([]);
  const [longitude, setLongitude] = useState<number>(100.53538958416028);
  const [latitude, setLatitude] = useState<number>(13.747164402978903);

  const imageListRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, errors } = useForm<Input>();
  const [fetchHotel, { data, loading }] = useHotelLazyQuery();
  const [uploadImages] = useMultiUploadMutation();
  const [deleteImage] = useDeleteHotelImageMutation();
  const [updateHotel] = useUpdateHotelMutation();

  useEffect(() => {
    fetchHotel({
      variables: {
        id: parseInt(params.id),
      },
    });

    if (data?.hotel) {
      setImages(data.hotel.hotelImages.map((image) => image.url));
      setLatitude(data.hotel.hotel.latitude);
      setLongitude(data.hotel.hotel.longitude);
    }
  }, [data?.hotel, fetchHotel, params.id]);

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

  const handleRemoveImage = async (image: File) => {
    if (typeof image === "string") {
      await deleteImage({
        variables: {
          id: parseInt(params.id),
          url: image,
        },
      });
    }
    const newImage = images.filter((imageState: any) => imageState !== image);
    setImages(newImage);
  };

  const onSubmit = async (input: Input) => {
    const imageForUpload = images.filter((image: any) => {
      if (typeof image === "object") {
        return image;
      }
    });

    let uploaded;

    if (imageForUpload.length) {
      uploaded = await uploadImages({
        variables: {
          files: imageForUpload,
          type: "hotel",
        },
      });
    }

    const { data } = await updateHotel({
      variables: {
        hotelEditInput: {
          hotel_id: parseInt(params.id),
          name: input.name,
          bio: input.bio,
          address: input.address,
          latitude,
          longitude,
          price: +input.price,
          images: uploaded?.data?.multiUpload ? uploaded.data?.multiUpload : [],
        },
      },
      update: (cache, { data }) => {
        const resultHotels = cache.readQuery<Cache>({
          query: HotelsDocument,
        });
        let newCache;
        if (resultHotels?.hotels) {
          newCache = [...resultHotels?.hotels, data?.updateHotel];
        } else {
          newCache = data?.updateHotel;
        }
        cache.writeQuery({
          query: HotelsDocument,
          data: {
            hotels: newCache,
          },
        });
      },
    });
    if (data?.updateHotel) {
      history.push("/");
    }
  };

  if (loading) {
    return <FullPageSpinner />;
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <input
            name="name"
            placeholder="Name"
            ref={register({ required: true, minLength: 3 })}
            defaultValue={data?.hotel?.hotel.name}
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
          <textarea
            name="bio"
            rows={5}
            placeholder="Bio"
            ref={register()}
            defaultValue={data?.hotel?.hotel.bio}
          />
        </FormGroup>
        <FormGroup>
          <textarea
            name="address"
            rows={5}
            placeholder="Address"
            ref={register({ required: true, minLength: 10 })}
            defaultValue={data?.hotel?.hotel.address}
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
            type="text"
            name="price"
            placeholder="Price"
            ref={register({
              required: true,
              pattern: {
                value: /[0-9]/,
                message: "Price is allow number only",
              },
            })}
            defaultValue={data?.hotel?.hotel.price}
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
            value={latitude}
            readOnly
            name="latitude"
            placeholder="Latitude"
            ref={register({ required: true })}
          />
          {errors.latitude && <ErrorMessage>Latitude is required</ErrorMessage>}
        </FormGroup>
        <FormGroup>
          <input
            value={longitude}
            readOnly
            name="longitude"
            placeholder="Longitude"
            ref={register({ required: true })}
          />
          {errors.longitude && (
            <ErrorMessage>Longitude is required</ErrorMessage>
          )}
        </FormGroup>
        <FormGroup className="image-list" ref={imageListRef}>
          <ImageList images={images} handleRemoveImage={handleRemoveImage} />
          <FileInput onChange={(image) => handleImage(image)} />
        </FormGroup>
        <Button type="submit" isLoading={false} text="Edit Hotel" />
      </form>
      {/* <MapBox
        latitude={data?.hotel?.hotel.latitude}
        longitude={data?.hotel?.hotel.longitude}
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

export default EditHotel;
