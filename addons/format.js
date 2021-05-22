module.exports = fn = data => {
    return {
        "id": data.id ? data.id.value : '',
        "nama": data.nama ? data.nama.value : '',
        "alamat": data.alamat ? data.alamat.value : '',
        "rating": data.rating ? data.rating.value : '',
        "fasilitas": data.fasilitas ? data.fasilitas.value : '',
        "menu": data.menu ? data.menu.value : '',
        "urlFoto": data.urlFoto ? data.urlFoto.value : ''
    }
}