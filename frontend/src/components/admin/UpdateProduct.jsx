import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateProductMutation, useGetProductDetailsQuery } from "../../redux/api/productsApi";
import { AiFillExclamationCircle } from "react-icons/ai";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: productDetails, isLoading } = useGetProductDetailsQuery(id);
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const [updateProduct] = useUpdateProductMutation();
  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (productDetails) {
      setValue("name", productDetails.product.name);
      setValue("price", productDetails.product.price);
      setValue("description", productDetails.product.description);
      setValue("category", productDetails.product.category);
      setValue("seller", productDetails.product.seller);
      setValue("stock", productDetails.product.stock);
      setExistingImages(productDetails.product.images);
    }
  }, [productDetails, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("price", data.price);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("seller", data.seller);
    formData.append("stock", data.stock);

    // Only append new images if there are any
    if (images.length > 0) {
      images.forEach(image => formData.append("images", image));
    }

    try {
      await updateProduct({ id, updatedProduct: formData }).unwrap();
      Swal.fire({
        title: "Uğur!",
        text: "Məhsul uğurla redaktə edildi!",
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        navigate("/admin/products");
      });
    } catch (error) {
      console.error("Məhsul redaktə etmək alınmadı: ", error);
      Swal.fire({
        title: "Xəta!",
        text: "Məhsul redaktə etmək alınmadı.",
        icon: "error",
        confirmButtonText: "Bağla"
      });
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  if (isLoading) {
    return <p>Yüklənir...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Məhsulu Redaktə Et</h2>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Məhsulun Adı
          </label>
          <input
            type="text"
            {...register("name", { required: "Məhsulun adını daxil edin" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.name && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.name.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Məhsulun Qiyməti
          </label>
          <input
            type="number"
            {...register("price", { required: "Məhsulun qiymətini daxil edin" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.price && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.price.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Məhsulun Təsviri
          </label>
          <textarea
            {...register("description", { required: "Məhsulun təsvirini daxil edin" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.description && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Məhsulun Kateqoriyası
          </label>
          <select
            {...register("category", { required: "Kateqoriyanı seçin" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Kateqoriyanı seçin</option>
            <option value="Electronics">Electronics</option>
            <option value="Cameras">Cameras</option>
            <option value="Laptops">Laptops</option>
            <option value="Accessories">Accessories</option>
            <option value="Headphones">Headphones</option>
            <option value="Food">Food</option>
            <option value="Books">Books</option>
            <option value="Sports">Sports</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Home">Home</option>
          </select>
          {errors.category && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.category.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Məhsulun Satıcısı
          </label>
          <input
            type="text"
            {...register("seller", { required: "Satıcının adını daxil edin" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.seller && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.seller.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Məhsulun Stoku
          </label>
          <input
            type="number"
            {...register("stock", { required: "Stoku daxil edin" })}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.stock && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.stock.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Mövcud Məhsul Şəkilləri
          </label>
          <div className="flex space-x-2">
            {existingImages.map((image, index) => (
              <img key={index} src={image.url} alt="product" className="w-20 h-20 object-cover" />
            ))}
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Yeni Məhsul Şəkilləri
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
          {errors.images && (
            <p className="text-red-600 text-sm">
              <AiFillExclamationCircle className="inline h-5 w-5" />
              {errors.images.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full px-3 py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          Məhsulu Redaktə Et
        </button>
      </form>
    </div>
  );
};

export default UpdateProduct;
