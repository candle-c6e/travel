import {
  FunctionComponent,
  useEffect,
  lazy,
  Suspense,
  FormEvent,
  useState,
} from "react";
import { Link, useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import styled from "styled-components";

import UserPlaceholder from "../asset/user-placeholder.svg";
import { useAuth } from "../context/auth-context";
import { removeToken } from "../auth-provider";
import {
  MeDocument,
  UpdateProfileDocument,
  useSingleUploadMutation,
  useUpdateAvatarMutation,
  useUpdateProfileMutation,
} from "../generated/graphql";
import Modal from "../components/Modal";
import UpdateProfile from "../components/UpdateProfile";
import { UpdateProfileInput } from "../types";

const MyReserved = lazy(() => import("../components/MyReserved"));
const MyHotels = lazy(() => import("../components/MyHotels"));

const AccountPage: FunctionComponent<{}> = () => {
  const history = useHistory();
  const client = useApolloClient();
  const auth = useAuth();
  const [upload] = useSingleUploadMutation({ errorPolicy: "all" });
  const [updateAvatar] = useUpdateAvatarMutation();
  const [updateProfile] = useUpdateProfileMutation({ errorPolicy: "all" });

  const [showDialog, setShowDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!auth?.user.me) return history.push("/");
  }, [auth?.user, history]);

  const handleLogout = () => {
    client.clearStore();
    removeToken();
    window.location.href = "/";
  };

  const handleDialog = () => {
    setShowDialog(true);
  };

  const onSubmit = async ({
    name,
    password,
    confirmPassword,
  }: UpdateProfileInput) => {
    await updateProfile({
      variables: {
        updateProfileInput: {
          name,
          password,
          confirmPassword,
        },
      },
      update: (cache, { data }) => {
        client.writeQuery({
          query: UpdateProfileDocument,
          data: {
            me: data,
          },
        });
      },
    });
  };

  const handleUpload = async (event: FormEvent<HTMLInputElement>) => {
    if (event.currentTarget.validity && event.currentTarget.files?.length) {
      const result = await upload({
        variables: {
          file: event.currentTarget.files[0],
          type: "avatar",
        },
      });

      if (result.errors) return;

      if (result.data?.singleUpload) {
        await updateAvatar({
          variables: {
            url: result.data.singleUpload,
          },
          update: () => {
            const resultCache = client.readQuery({ query: MeDocument });
            client.writeQuery({
              query: MeDocument,
              data: {
                me: {
                  ...resultCache,
                  avatar: result.data?.singleUpload,
                },
              },
            });
          },
        });
      }
    }
  };

  return (
    <Wrapper>
      <Profile>
        <Avatar>
          <label htmlFor="file" style={{ cursor: "pointer" }}>
            <img
              src={
                auth?.user.me.avatar
                  ? `${process.env.REACT_APP_API_URL}/uploads/avatars/${auth?.user.me.avatar}`
                  : UserPlaceholder
              }
              alt="user"
            />
          </label>
          <input
            type="file"
            id="file"
            onChange={handleUpload}
            style={{ display: "none" }}
          />
        </Avatar>
        <h2>{auth?.user.me && auth?.user.me.name}</h2>
        <List>
          <Link to="/add-hotel">Add Hotel</Link>
        </List>
        <List onClick={handleDialog}>Edit Profile</List>
        <List onClick={handleLogout}>Logout</List>
      </Profile>
      <Info>
        <Suspense fallback={<div>Loading...</div>}>
          <MyReserved />
          <MyHotels />
        </Suspense>
      </Info>
      <Modal
        showDialog={showDialog}
        setShowDialog={(boolean) => setShowDialog(boolean)}
      >
        <h3 style={{ marginBottom: "1rem", color: "black" }}>Update Profile</h3>
        <UpdateProfile onSubmit={onSubmit} />
      </Modal>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-columns: 1fr 3fr;
  grid-gap: 5rem;
  overflow: hidden;
`;

const Profile = styled.div`
  padding: 1.6rem;
  border: 1px solid #dddddd !important;
  border-radius: 4px;
  text-align: center;

  h2 {
    margin-top: 2rem;
  }
`;

const List = styled.div`
  cursor: pointer;
  margin: 1rem 0;

  a {
    text-decoration: underline;
  }
`;

const Info = styled.div``;

const Avatar = styled.div`
  margin: 0 auto;
  max-width: 200px;
  text-align: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default AccountPage;
