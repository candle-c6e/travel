import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<Users>;
  reservedUsers: ResponseReservedUser;
  hotelsUser: ResponseHotelsUser;
  searchHotel: Array<Hotels>;
  hotels: ResponseHotels;
  hotel?: Maybe<ResponseHotel>;
};


export type QueryReservedUsersArgs = {
  paginateInput: PaginateInput;
};


export type QueryHotelsUserArgs = {
  paginateInput: PaginateInput;
};


export type QuerySearchHotelArgs = {
  search?: Maybe<Scalars['String']>;
};


export type QueryHotelsArgs = {
  paginateInput: PaginateInput;
};


export type QueryHotelArgs = {
  id: Scalars['Float'];
};

export type Users = {
  __typename?: 'Users';
  id: Scalars['Float'];
  name: Scalars['String'];
  avatar?: Maybe<Scalars['String']>;
  created_at: Scalars['DateTime'];
  updated_at: Scalars['DateTime'];
  hotels: Array<Hotels>;
  reservations: Array<Reservations>;
};


export type Hotels = {
  __typename?: 'Hotels';
  id: Scalars['Float'];
  name: Scalars['String'];
  bio: Scalars['String'];
  address: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  location: Scalars['Float'];
  price: Scalars['Float'];
  user: Users;
  hotelImages: Array<HotelImages>;
  reservations: Array<Reservations>;
};

export type HotelImages = {
  __typename?: 'HotelImages';
  url: Scalars['String'];
  created_at: Scalars['DateTime'];
  hotel: Hotels;
};

export type Reservations = {
  __typename?: 'Reservations';
  id: Scalars['Float'];
  price: Scalars['Float'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  created_at: Scalars['DateTime'];
  hotel: Hotels;
  user: Users;
};

export type ResponseReservedUser = {
  __typename?: 'ResponseReservedUser';
  reserved: Array<ReservedUser>;
  totalPages: Scalars['Float'];
};

export type ReservedUser = {
  __typename?: 'ReservedUser';
  id: Scalars['Float'];
  hotel_id: Scalars['Float'];
  name: Scalars['String'];
  url: Scalars['String'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  days: Scalars['Float'];
  created_at: Scalars['DateTime'];
};

export type PaginateInput = {
  offset: Scalars['Float'];
  limit: Scalars['Float'];
};

export type ResponseHotelsUser = {
  __typename?: 'ResponseHotelsUser';
  hotel: Array<HotelUser>;
  totalPages: Scalars['Float'];
};

export type HotelUser = {
  __typename?: 'HotelUser';
  id: Scalars['Float'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ResponseHotels = {
  __typename?: 'ResponseHotels';
  hotels: Array<HotelsType>;
  totalPages: Scalars['Float'];
};

export type HotelsType = {
  __typename?: 'HotelsType';
  id: Scalars['Float'];
  name: Scalars['String'];
  url: Scalars['String'];
};

export type ResponseHotel = {
  __typename?: 'ResponseHotel';
  hotel: Hotels;
  hotelImages: Array<HotelImages>;
  reservedDates: Array<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  user?: Maybe<Users>;
  updateAvatar: Scalars['Boolean'];
  updateProfile: Users;
  login: UserWithToken;
  register: UserWithToken;
  addHotel?: Maybe<Hotels>;
  updateHotel?: Maybe<Hotels>;
  deleteHotel: Scalars['Boolean'];
  deleteHotelImage: Scalars['Boolean'];
  multiUpload: Array<Scalars['String']>;
  singleUpload: Scalars['String'];
  addReservation: Scalars['Boolean'];
};


export type MutationUserArgs = {
  id: Scalars['Float'];
};


export type MutationUpdateAvatarArgs = {
  url: Scalars['String'];
};


export type MutationUpdateProfileArgs = {
  updateProfileInput: UpdateProfileInput;
};


export type MutationLoginArgs = {
  loginInput: LoginInput;
};


export type MutationRegisterArgs = {
  registerInput: RegisterInput;
};


export type MutationAddHotelArgs = {
  hotelInput: HotelInput;
};


export type MutationUpdateHotelArgs = {
  hotelEditInput: HotelEditInput;
};


export type MutationDeleteHotelArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteHotelImageArgs = {
  url: Scalars['String'];
  id: Scalars['Float'];
};


export type MutationMultiUploadArgs = {
  type: Scalars['String'];
  files: Array<Scalars['Upload']>;
};


export type MutationSingleUploadArgs = {
  type: Scalars['String'];
  file: Scalars['Upload'];
};


export type MutationAddReservationArgs = {
  reserveInput: ReserveInput;
};

export type UpdateProfileInput = {
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  confirmPassword?: Maybe<Scalars['String']>;
};

export type UserWithToken = {
  __typename?: 'UserWithToken';
  users: Users;
  token: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  name: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
};

export type HotelInput = {
  name: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  images: Array<Scalars['String']>;
};

export type HotelEditInput = {
  name: Scalars['String'];
  address?: Maybe<Scalars['String']>;
  bio?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  images: Array<Scalars['String']>;
  hotel_id: Scalars['Int'];
};


export type ReserveInput = {
  hotel_id: Scalars['Float'];
  price: Scalars['Float'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
};

export type AddHotelMutationVariables = Exact<{
  hotelInput: HotelInput;
}>;


export type AddHotelMutation = (
  { __typename?: 'Mutation' }
  & { addHotel?: Maybe<(
    { __typename?: 'Hotels' }
    & Pick<Hotels, 'id' | 'name' | 'bio'>
    & { hotelImages: Array<(
      { __typename?: 'HotelImages' }
      & Pick<HotelImages, 'url'>
    )> }
  )> }
);

export type AddReservationMutationVariables = Exact<{
  hotel_id: Scalars['Float'];
  start_date: Scalars['DateTime'];
  end_date: Scalars['DateTime'];
  price: Scalars['Float'];
}>;


export type AddReservationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'addReservation'>
);

export type DeleteHotelImageMutationVariables = Exact<{
  id: Scalars['Float'];
  url: Scalars['String'];
}>;


export type DeleteHotelImageMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteHotelImage'>
);

export type LoginMutationVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserWithToken' }
    & Pick<UserWithToken, 'token'>
    & { users: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'name' | 'avatar'>
    ) }
  ) }
);

export type MultiUploadMutationVariables = Exact<{
  files: Array<Scalars['Upload']>;
  type: Scalars['String'];
}>;


export type MultiUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'multiUpload'>
);

export type RegisterMutationVariables = Exact<{
  registerInput: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserWithToken' }
    & Pick<UserWithToken, 'token'>
    & { users: (
      { __typename?: 'Users' }
      & Pick<Users, 'id' | 'name'>
    ) }
  ) }
);

export type SingleUploadMutationVariables = Exact<{
  file: Scalars['Upload'];
  type: Scalars['String'];
}>;


export type SingleUploadMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'singleUpload'>
);

export type UpdateAvatarMutationVariables = Exact<{
  url: Scalars['String'];
}>;


export type UpdateAvatarMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'updateAvatar'>
);

export type UpdateHotelMutationVariables = Exact<{
  hotelEditInput: HotelEditInput;
}>;


export type UpdateHotelMutation = (
  { __typename?: 'Mutation' }
  & { updateHotel?: Maybe<(
    { __typename?: 'Hotels' }
    & Pick<Hotels, 'id' | 'name'>
    & { hotelImages: Array<(
      { __typename?: 'HotelImages' }
      & Pick<HotelImages, 'url'>
    )> }
  )> }
);

export type UpdateProfileMutationVariables = Exact<{
  updateProfileInput: UpdateProfileInput;
}>;


export type UpdateProfileMutation = (
  { __typename?: 'Mutation' }
  & { updateProfile: (
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  ) }
);

export type HotelQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type HotelQuery = (
  { __typename?: 'Query' }
  & { hotel?: Maybe<(
    { __typename?: 'ResponseHotel' }
    & Pick<ResponseHotel, 'reservedDates'>
    & { hotel: (
      { __typename?: 'Hotels' }
      & Pick<Hotels, 'id' | 'name' | 'bio' | 'address' | 'latitude' | 'longitude' | 'price'>
      & { user: (
        { __typename?: 'Users' }
        & Pick<Users, 'name' | 'avatar'>
      ) }
    ), hotelImages: Array<(
      { __typename?: 'HotelImages' }
      & Pick<HotelImages, 'url'>
    )> }
  )> }
);

export type HotelsQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type HotelsQuery = (
  { __typename?: 'Query' }
  & { hotels: (
    { __typename?: 'ResponseHotels' }
    & Pick<ResponseHotels, 'totalPages'>
    & { hotels: Array<(
      { __typename?: 'HotelsType' }
      & Pick<HotelsType, 'id' | 'name' | 'url'>
    )> }
  ) }
);

export type HotelsUserQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type HotelsUserQuery = (
  { __typename?: 'Query' }
  & { hotelsUser: (
    { __typename?: 'ResponseHotelsUser' }
    & Pick<ResponseHotelsUser, 'totalPages'>
    & { hotel: Array<(
      { __typename?: 'HotelUser' }
      & Pick<HotelUser, 'id' | 'name' | 'url'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  )> }
);

export type ReservedUsersQueryVariables = Exact<{
  paginateInput: PaginateInput;
}>;


export type ReservedUsersQuery = (
  { __typename?: 'Query' }
  & { reservedUsers: (
    { __typename?: 'ResponseReservedUser' }
    & Pick<ResponseReservedUser, 'totalPages'>
    & { reserved: Array<(
      { __typename?: 'ReservedUser' }
      & Pick<ReservedUser, 'id' | 'hotel_id' | 'name' | 'url' | 'start_date' | 'end_date' | 'days' | 'created_at'>
    )> }
  ) }
);

export type UserMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type UserMutation = (
  { __typename?: 'Mutation' }
  & { user?: Maybe<(
    { __typename?: 'Users' }
    & Pick<Users, 'id' | 'name' | 'avatar'>
  )> }
);


export const AddHotelDocument = gql`
    mutation AddHotel($hotelInput: HotelInput!) {
  addHotel(hotelInput: $hotelInput) {
    id
    name
    bio
    hotelImages {
      url
    }
  }
}
    `;
export type AddHotelMutationFn = Apollo.MutationFunction<AddHotelMutation, AddHotelMutationVariables>;

/**
 * __useAddHotelMutation__
 *
 * To run a mutation, you first call `useAddHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHotelMutation, { data, loading, error }] = useAddHotelMutation({
 *   variables: {
 *      hotelInput: // value for 'hotelInput'
 *   },
 * });
 */
export function useAddHotelMutation(baseOptions?: Apollo.MutationHookOptions<AddHotelMutation, AddHotelMutationVariables>) {
        return Apollo.useMutation<AddHotelMutation, AddHotelMutationVariables>(AddHotelDocument, baseOptions);
      }
export type AddHotelMutationHookResult = ReturnType<typeof useAddHotelMutation>;
export type AddHotelMutationResult = Apollo.MutationResult<AddHotelMutation>;
export type AddHotelMutationOptions = Apollo.BaseMutationOptions<AddHotelMutation, AddHotelMutationVariables>;
export const AddReservationDocument = gql`
    mutation AddReservation($hotel_id: Float!, $start_date: DateTime!, $end_date: DateTime!, $price: Float!) {
  addReservation(
    reserveInput: {hotel_id: $hotel_id, start_date: $start_date, end_date: $end_date, price: $price}
  )
}
    `;
export type AddReservationMutationFn = Apollo.MutationFunction<AddReservationMutation, AddReservationMutationVariables>;

/**
 * __useAddReservationMutation__
 *
 * To run a mutation, you first call `useAddReservationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddReservationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addReservationMutation, { data, loading, error }] = useAddReservationMutation({
 *   variables: {
 *      hotel_id: // value for 'hotel_id'
 *      start_date: // value for 'start_date'
 *      end_date: // value for 'end_date'
 *      price: // value for 'price'
 *   },
 * });
 */
export function useAddReservationMutation(baseOptions?: Apollo.MutationHookOptions<AddReservationMutation, AddReservationMutationVariables>) {
        return Apollo.useMutation<AddReservationMutation, AddReservationMutationVariables>(AddReservationDocument, baseOptions);
      }
export type AddReservationMutationHookResult = ReturnType<typeof useAddReservationMutation>;
export type AddReservationMutationResult = Apollo.MutationResult<AddReservationMutation>;
export type AddReservationMutationOptions = Apollo.BaseMutationOptions<AddReservationMutation, AddReservationMutationVariables>;
export const DeleteHotelImageDocument = gql`
    mutation DeleteHotelImage($id: Float!, $url: String!) {
  deleteHotelImage(id: $id, url: $url)
}
    `;
export type DeleteHotelImageMutationFn = Apollo.MutationFunction<DeleteHotelImageMutation, DeleteHotelImageMutationVariables>;

/**
 * __useDeleteHotelImageMutation__
 *
 * To run a mutation, you first call `useDeleteHotelImageMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteHotelImageMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteHotelImageMutation, { data, loading, error }] = useDeleteHotelImageMutation({
 *   variables: {
 *      id: // value for 'id'
 *      url: // value for 'url'
 *   },
 * });
 */
export function useDeleteHotelImageMutation(baseOptions?: Apollo.MutationHookOptions<DeleteHotelImageMutation, DeleteHotelImageMutationVariables>) {
        return Apollo.useMutation<DeleteHotelImageMutation, DeleteHotelImageMutationVariables>(DeleteHotelImageDocument, baseOptions);
      }
export type DeleteHotelImageMutationHookResult = ReturnType<typeof useDeleteHotelImageMutation>;
export type DeleteHotelImageMutationResult = Apollo.MutationResult<DeleteHotelImageMutation>;
export type DeleteHotelImageMutationOptions = Apollo.BaseMutationOptions<DeleteHotelImageMutation, DeleteHotelImageMutationVariables>;
export const LoginDocument = gql`
    mutation Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    users {
      id
      name
      avatar
    }
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const MultiUploadDocument = gql`
    mutation MultiUpload($files: [Upload!]!, $type: String!) {
  multiUpload(files: $files, type: $type)
}
    `;
export type MultiUploadMutationFn = Apollo.MutationFunction<MultiUploadMutation, MultiUploadMutationVariables>;

/**
 * __useMultiUploadMutation__
 *
 * To run a mutation, you first call `useMultiUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMultiUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [multiUploadMutation, { data, loading, error }] = useMultiUploadMutation({
 *   variables: {
 *      files: // value for 'files'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useMultiUploadMutation(baseOptions?: Apollo.MutationHookOptions<MultiUploadMutation, MultiUploadMutationVariables>) {
        return Apollo.useMutation<MultiUploadMutation, MultiUploadMutationVariables>(MultiUploadDocument, baseOptions);
      }
export type MultiUploadMutationHookResult = ReturnType<typeof useMultiUploadMutation>;
export type MultiUploadMutationResult = Apollo.MutationResult<MultiUploadMutation>;
export type MultiUploadMutationOptions = Apollo.BaseMutationOptions<MultiUploadMutation, MultiUploadMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($registerInput: RegisterInput!) {
  register(registerInput: $registerInput) {
    users {
      id
      name
    }
    token
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      registerInput: // value for 'registerInput'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SingleUploadDocument = gql`
    mutation SingleUpload($file: Upload!, $type: String!) {
  singleUpload(file: $file, type: $type)
}
    `;
export type SingleUploadMutationFn = Apollo.MutationFunction<SingleUploadMutation, SingleUploadMutationVariables>;

/**
 * __useSingleUploadMutation__
 *
 * To run a mutation, you first call `useSingleUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSingleUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [singleUploadMutation, { data, loading, error }] = useSingleUploadMutation({
 *   variables: {
 *      file: // value for 'file'
 *      type: // value for 'type'
 *   },
 * });
 */
export function useSingleUploadMutation(baseOptions?: Apollo.MutationHookOptions<SingleUploadMutation, SingleUploadMutationVariables>) {
        return Apollo.useMutation<SingleUploadMutation, SingleUploadMutationVariables>(SingleUploadDocument, baseOptions);
      }
export type SingleUploadMutationHookResult = ReturnType<typeof useSingleUploadMutation>;
export type SingleUploadMutationResult = Apollo.MutationResult<SingleUploadMutation>;
export type SingleUploadMutationOptions = Apollo.BaseMutationOptions<SingleUploadMutation, SingleUploadMutationVariables>;
export const UpdateAvatarDocument = gql`
    mutation UpdateAvatar($url: String!) {
  updateAvatar(url: $url)
}
    `;
export type UpdateAvatarMutationFn = Apollo.MutationFunction<UpdateAvatarMutation, UpdateAvatarMutationVariables>;

/**
 * __useUpdateAvatarMutation__
 *
 * To run a mutation, you first call `useUpdateAvatarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAvatarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAvatarMutation, { data, loading, error }] = useUpdateAvatarMutation({
 *   variables: {
 *      url: // value for 'url'
 *   },
 * });
 */
export function useUpdateAvatarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>) {
        return Apollo.useMutation<UpdateAvatarMutation, UpdateAvatarMutationVariables>(UpdateAvatarDocument, baseOptions);
      }
export type UpdateAvatarMutationHookResult = ReturnType<typeof useUpdateAvatarMutation>;
export type UpdateAvatarMutationResult = Apollo.MutationResult<UpdateAvatarMutation>;
export type UpdateAvatarMutationOptions = Apollo.BaseMutationOptions<UpdateAvatarMutation, UpdateAvatarMutationVariables>;
export const UpdateHotelDocument = gql`
    mutation UpdateHotel($hotelEditInput: HotelEditInput!) {
  updateHotel(hotelEditInput: $hotelEditInput) {
    id
    name
    hotelImages {
      url
    }
  }
}
    `;
export type UpdateHotelMutationFn = Apollo.MutationFunction<UpdateHotelMutation, UpdateHotelMutationVariables>;

/**
 * __useUpdateHotelMutation__
 *
 * To run a mutation, you first call `useUpdateHotelMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHotelMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHotelMutation, { data, loading, error }] = useUpdateHotelMutation({
 *   variables: {
 *      hotelEditInput: // value for 'hotelEditInput'
 *   },
 * });
 */
export function useUpdateHotelMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHotelMutation, UpdateHotelMutationVariables>) {
        return Apollo.useMutation<UpdateHotelMutation, UpdateHotelMutationVariables>(UpdateHotelDocument, baseOptions);
      }
export type UpdateHotelMutationHookResult = ReturnType<typeof useUpdateHotelMutation>;
export type UpdateHotelMutationResult = Apollo.MutationResult<UpdateHotelMutation>;
export type UpdateHotelMutationOptions = Apollo.BaseMutationOptions<UpdateHotelMutation, UpdateHotelMutationVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($updateProfileInput: UpdateProfileInput!) {
  updateProfile(updateProfileInput: $updateProfileInput) {
    id
    name
    avatar
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      updateProfileInput: // value for 'updateProfileInput'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, baseOptions);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;
export const HotelDocument = gql`
    query Hotel($id: Float!) {
  hotel(id: $id) {
    hotel {
      id
      name
      bio
      address
      latitude
      longitude
      price
      user {
        name
        avatar
      }
    }
    hotelImages {
      url
    }
    reservedDates
  }
}
    `;

/**
 * __useHotelQuery__
 *
 * To run a query within a React component, call `useHotelQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotelQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotelQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHotelQuery(baseOptions: Apollo.QueryHookOptions<HotelQuery, HotelQueryVariables>) {
        return Apollo.useQuery<HotelQuery, HotelQueryVariables>(HotelDocument, baseOptions);
      }
export function useHotelLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HotelQuery, HotelQueryVariables>) {
          return Apollo.useLazyQuery<HotelQuery, HotelQueryVariables>(HotelDocument, baseOptions);
        }
export type HotelQueryHookResult = ReturnType<typeof useHotelQuery>;
export type HotelLazyQueryHookResult = ReturnType<typeof useHotelLazyQuery>;
export type HotelQueryResult = Apollo.QueryResult<HotelQuery, HotelQueryVariables>;
export const HotelsDocument = gql`
    query Hotels($paginateInput: PaginateInput!) {
  hotels(paginateInput: $paginateInput) {
    hotels {
      id
      name
      url
    }
    totalPages
  }
}
    `;

/**
 * __useHotelsQuery__
 *
 * To run a query within a React component, call `useHotelsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotelsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotelsQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useHotelsQuery(baseOptions: Apollo.QueryHookOptions<HotelsQuery, HotelsQueryVariables>) {
        return Apollo.useQuery<HotelsQuery, HotelsQueryVariables>(HotelsDocument, baseOptions);
      }
export function useHotelsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HotelsQuery, HotelsQueryVariables>) {
          return Apollo.useLazyQuery<HotelsQuery, HotelsQueryVariables>(HotelsDocument, baseOptions);
        }
export type HotelsQueryHookResult = ReturnType<typeof useHotelsQuery>;
export type HotelsLazyQueryHookResult = ReturnType<typeof useHotelsLazyQuery>;
export type HotelsQueryResult = Apollo.QueryResult<HotelsQuery, HotelsQueryVariables>;
export const HotelsUserDocument = gql`
    query HotelsUser($paginateInput: PaginateInput!) {
  hotelsUser(paginateInput: $paginateInput) {
    hotel {
      id
      name
      url
    }
    totalPages
  }
}
    `;

/**
 * __useHotelsUserQuery__
 *
 * To run a query within a React component, call `useHotelsUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useHotelsUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHotelsUserQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useHotelsUserQuery(baseOptions: Apollo.QueryHookOptions<HotelsUserQuery, HotelsUserQueryVariables>) {
        return Apollo.useQuery<HotelsUserQuery, HotelsUserQueryVariables>(HotelsUserDocument, baseOptions);
      }
export function useHotelsUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HotelsUserQuery, HotelsUserQueryVariables>) {
          return Apollo.useLazyQuery<HotelsUserQuery, HotelsUserQueryVariables>(HotelsUserDocument, baseOptions);
        }
export type HotelsUserQueryHookResult = ReturnType<typeof useHotelsUserQuery>;
export type HotelsUserLazyQueryHookResult = ReturnType<typeof useHotelsUserLazyQuery>;
export type HotelsUserQueryResult = Apollo.QueryResult<HotelsUserQuery, HotelsUserQueryVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    name
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const ReservedUsersDocument = gql`
    query ReservedUsers($paginateInput: PaginateInput!) {
  reservedUsers(paginateInput: $paginateInput) {
    reserved {
      id
      hotel_id
      name
      url
      start_date
      end_date
      days
      created_at
    }
    totalPages
  }
}
    `;

/**
 * __useReservedUsersQuery__
 *
 * To run a query within a React component, call `useReservedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useReservedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useReservedUsersQuery({
 *   variables: {
 *      paginateInput: // value for 'paginateInput'
 *   },
 * });
 */
export function useReservedUsersQuery(baseOptions: Apollo.QueryHookOptions<ReservedUsersQuery, ReservedUsersQueryVariables>) {
        return Apollo.useQuery<ReservedUsersQuery, ReservedUsersQueryVariables>(ReservedUsersDocument, baseOptions);
      }
export function useReservedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ReservedUsersQuery, ReservedUsersQueryVariables>) {
          return Apollo.useLazyQuery<ReservedUsersQuery, ReservedUsersQueryVariables>(ReservedUsersDocument, baseOptions);
        }
export type ReservedUsersQueryHookResult = ReturnType<typeof useReservedUsersQuery>;
export type ReservedUsersLazyQueryHookResult = ReturnType<typeof useReservedUsersLazyQuery>;
export type ReservedUsersQueryResult = Apollo.QueryResult<ReservedUsersQuery, ReservedUsersQueryVariables>;
export const UserDocument = gql`
    mutation User($id: Float!) {
  user(id: $id) {
    id
    name
    avatar
  }
}
    `;
export type UserMutationFn = Apollo.MutationFunction<UserMutation, UserMutationVariables>;

/**
 * __useUserMutation__
 *
 * To run a mutation, you first call `useUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [userMutation, { data, loading, error }] = useUserMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserMutation(baseOptions?: Apollo.MutationHookOptions<UserMutation, UserMutationVariables>) {
        return Apollo.useMutation<UserMutation, UserMutationVariables>(UserDocument, baseOptions);
      }
export type UserMutationHookResult = ReturnType<typeof useUserMutation>;
export type UserMutationResult = Apollo.MutationResult<UserMutation>;
export type UserMutationOptions = Apollo.BaseMutationOptions<UserMutation, UserMutationVariables>;