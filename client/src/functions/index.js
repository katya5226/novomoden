import axios from 'axios';

//UploadPage.jsx, EditPage.jsx

export function doUpload(type, selection, userId, user, signal, adId, photos) {

    if(photos) {
        const data = new FormData();

        const files = photos.map(photo => {
            return photo.file;
        })
        for(let i = 0; i<files.length; i++) {
            data.append('file', files[i]);
        }
        for(let i = 0; i<files.length; i++) {
            data.append('fileName' + (i+1), files[i].name);
        }

        const crops = photos.map(photo => {
            return photo.crop;
        })
        for(let i = 0; i<crops.length; i++) {
            data.append('width' + (i+1), crops[i].width);
            data.append('height' + (i+1), crops[i].height);
            data.append('left' + (i+1), crops[i].x);
            data.append('top' + (i+1), crops[i].y);
        }

        Object.keys(selection).forEach(key => {
            data.append(key, selection[key]);
        });

        data.append('userId', userId);
        data.append('userName', user);
        data.append('type', type);
        data.append('adId', adId);

        //http://185.185.41.168/:4007
        //alert(data);

        return axios.post('http://novomoden.si/api/uploadListing', data, {cancelToken: signal.token});
        //return axios.post('http://novomoden.si:4007/uploadListing', data, {cancelToken: signal.token});
    } else {
        return fetch('/api/editListing', {
            signal: signal,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                selection,
                userId: userId,
                userName: user,
                type: type,
                adId: adId
            })
        })
    }
}


//SelectForms.jsx

export function findIndex(array, nameWeAreLookingFor) {
    for(let i = 0; i<array.length; i++) {
        if(array[i].label === nameWeAreLookingFor) return i;
    }
    return 0;
}

export function findIndexByValue(array, nameWeAreLookingFor) {
    for(let i = 0; i<array.length; i++) {
        if(array[i].value === nameWeAreLookingFor) return i;
    }
    return 0;
}