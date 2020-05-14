import axios from 'axios';
const serverUrl = 'http://localhost:4000';
export const chatServerUrl = 'http://localhost:4001';
const uploadUrl = `${serverUrl}/upload`;
const usersUrl = `${serverUrl}/users`;
const petsUrl = `${serverUrl}/pets`;
const albumsUrl = `${serverUrl}/albums/`;
const photosUrl = `${serverUrl}/photos`;
const dialogsUrl = `${serverUrl}/dialogs`
export const publicUrl = `${serverUrl}/public/`;
export enum LoadingState {
    Loading,
    Loaded,
    Failed,
    NotFound
};

axios.interceptors.request.use((request) => {
    const token = localStorage.getItem("PBToken");
    if (token) {
        request.headers['Authorization'] = `Bearer ${token}`;
    };
    return request;
});

export async function getAllUsers () {
    return await axios.get(usersUrl);
};

export async function getSingleUser (id: string) {
    return await axios.get(`${usersUrl}/${id}`);
};

export async function getSingleUserPets (id: string) {
    return await axios.get(`${usersUrl}/${id}`);
};

export async function deleteSingleUser (id: string) {
    return await axios.delete(`${usersUrl}/${id}`);
};

export async function signInUser (data:any) {
    return await axios.post(`${usersUrl}/login`, data);
};

export async function signOutUser () {
    return await axios.post(`${usersUrl}/logout`);
};

export async function signUpUser (data:any) {
    return await axios.post(`${usersUrl}`, data);
};

export async function editUser (id:string, data:any) {
    return await axios.put(`${usersUrl}/${id}`, data);
};

export async function addUserPet (ownerId:string, data:any) {
    return await axios.post(`${petsUrl}`, {owner: ownerId, ...data});
};

export async function deleteSinglePet (id:string) {
    return await axios.delete(`${petsUrl}/${id}`);
};

export async function setUserAvatar (id:any, files:any) {
    const file = files[0];
    const formData = new FormData();
    formData.append('file', file, file.name);
    return await axios.post(`${uploadUrl}/avatar`, formData);
};

export async function getUserAlbums (userId:string) {
    return await axios.get(`${albumsUrl}/?userId=${userId}`);
};

export async function addUserAlbum (ownerId:any, data: any) {
    return await axios.post(`${albumsUrl}`, {owner: ownerId, ...data});
};

export async function getAlbumPhotos (albumId:string) {
    return await axios.get(`${albumsUrl}/${albumId}`);
};

export async function deleteSingleAlbum (albumId:string, ownerId: string) {
    return await axios.delete(`${albumsUrl}/${albumId}/?ownerId=${ownerId}`);
};

export async function addPhotosToAlbum (albumId:any, files:any) {
    const formData = new FormData();
    for (let i=0; i<files.length; i++) {
        formData.append('files', files[i], files[i].name);
    }
    return await axios.post(`${uploadUrl}/album/${albumId}`, formData);
};

export async function deleteSinglePhoto (photoId:string, photoUrl: string) {
    const url = photoUrl.replace('http://localhost:4000', '.');
    return await axios.delete(`${photosUrl}/${photoId}/?photoUrl=${url}`);
};

export async function getUserDialogs (userId: string) {
    return await axios.get(`${dialogsUrl}/${userId}`);
};

export async function getDialogWMessages (dialogId: string) {
    return await axios.get(`${dialogsUrl}/${dialogId}/messages`);
};