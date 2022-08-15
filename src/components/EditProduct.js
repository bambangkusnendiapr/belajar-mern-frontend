import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditProduct = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [file, setFile] = useState("");
    const [preview, setPreview] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getProductById();
    }, [])

    const {id} = useParams();

    const getProductById = async () => {
        const response = await axios.get(`http://localhost:5000/products/${id}`);
        setTitle(response.data.name)
        setPrice(response.data.price)
        setStock(response.data.stock)
        setFile(response.data.image)
        setPreview(response.data.url)
    }

    const loadImage = (e) => {
        const image = e.target.files[0];
        setFile(image);
        setPreview(URL.createObjectURL(image));
    }

    const updateProduct = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        formData.append("price", price);
        formData.append("stock", stock);
        formData.append("file", file);

        try {
            await axios.put(`http://localhost:5000/products/${id}`, formData, {
                headers: {
                    "Content-type": "multipart/form-data"
                }
            });
            navigate("/products");
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <div className="columns is-centered mt-5">
        <div className="column is-half">
            <form onSubmit={updateProduct}>
                <div className="field">
                    <label className='label'>Product Name</label>
                    <div className="control">
                        <input type="text" className='input' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Product Name' />
                    </div>
                </div>

                <div className="field">
                    <label className='label'>Price</label>
                    <div className="control">
                        <input type="number" className='input' value={price} onChange={(e) => setPrice(e.target.value)} placeholder='Price' />
                    </div>
                </div>

                <div className="field">
                    <label className='label'>Stock</label>
                    <div className="control">
                        <input type="number" className='input' value={stock} onChange={(e) => setStock(e.target.value)} placeholder='Stock' />
                    </div>
                </div>

                <div className="field">
                    <label className='label'>Image</label>
                    <div className="control">
                        <div className="file">
                            <label className="file-label">
                                <input type="file" className="file-input" onChange={loadImage} />
                                <span className='file-cta'>
                                    <span className='file-label'>Choose a file..</span>
                                </span>
                            </label>
                        </div>
                    </div>
                </div>

                {preview ? (
                    <figure className='image is-128x128'>
                        <img src={preview} alt="Preview Image" />
                    </figure>
                ) : (
                    ""
                )}

                <div className="field">
                    <div className="control">
                        <button type='submit' className="button is-success">Save</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditProduct