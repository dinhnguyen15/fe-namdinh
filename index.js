// import React, { useState, useEffect } from 'react';

// const [postList, setPostList] = useState([]);

// useEffect(() => {
//     async function fetchPostList() {
//         try {
//             const requestUrl = 'http://eyecheck.vn/namdinhclient.apis/client/places?lang=vn';
//             const reponse = await fetch(requestUrl);
//             const reponseJSON = await reponse.json();
//             console.log({ reponseJSON });

//             const { data } = reponseJSON;
//             setPostList(data);
//         } catch (error) {
//             console.log('Failed to fetchpost list', error.message);
//         }

//     }
//     fetchPostList();
// }, []);