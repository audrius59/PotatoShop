import React, { useState, useEffect, useContext, useCallback } from "react";
import { withRouter } from "react-router-dom";
import { useParams } from "react-router-dom";
import ProductForm from "./ProductForm";
import ApiFactory from "../mock";
import Modal from "./Modal";
import { AuthContext } from "../context/AuthContext";

const ProductEdit = ({ history }) => {
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");
  const isAuth = useContext(AuthContext);
  const { id } = useParams();

  if (!isAuth) {
    history.push("/products");
  }

  const getProduct = useCallback(id => {
    ApiFactory.getInstance()
      .get(`/api/products/${id}`)
      .then(({ data }) => {
        if (!data) {
          console.log("Product not found");
          return;
        }
        setProduct(data);
      })
      .catch(error => {
        setMessage(error.response);
      });
  }, []);

  function updateProduct(id, data) {
    ApiFactory.getInstance()
      .put(`/api/products/${id}`, data)
      .then(() => {
        history.push("/products");
      })
      .catch(error => {
        setMessage(error.response);
      });
  }

  const handleSubmit = (e, data) => {
    e.preventDefault();
    updateProduct(id, data);
  };

  const handleClose = () => {
    setMessage("");
  };

  useEffect(() => {
    getProduct(id);
  }, [getProduct, id]);

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} product={product} />
      {message && <Modal onClose={handleClose}>{message}</Modal>}
    </div>
  );
};

export default withRouter(ProductEdit);
