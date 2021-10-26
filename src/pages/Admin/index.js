import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductStart, fetchProductsStart, deleteProductStart } from './../../redux/Products/products.actions';
import Modal from './../../components/Modal';
import FormInput from './../../components/forms/FormInput';
import FormSelect from './../../components/forms/FormSelect';
import MultipleSelect from './../../components/forms/MultipleSelect';
import Button from './../../components/forms/Button';
import LoadMore from './../../components/LoadMore';
import { CKEditor } from 'ckeditor4-react';
import './styles.scss';
import { storage } from './../../firebase/utils'
import { CircularProgress } from '@material-ui/core';

import { contentApi } from './../../Utils'
import { useHistory } from 'react-router';
import SimpleDialog from '../../components/Dialog';

const mapState = ({ productsData, user }) => ({
  products: productsData.products,
  id: user.currentUser.id
});

const ADMIN = ['W1j64KzUNrWAlnYBZipDnIiTz762'];


const Admin = props => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const { products, id } = useSelector(mapState);
  const dispatch = useDispatch();
  const [hideModal, setHideModal] = useState(true);
  const [mainCategory, setMainCategory] = useState('apparel');
  const [productCategory, setProductCategory] = useState('womens');
  const [productSize, setProductSize] = useState([]);
  const [productName, setProductName] = useState('');
  const [brand, setProductBrand] = useState('');
  const [productColor, setProductColor] = useState([]);
  const [productThumbnail, setProductThumbnail] = useState([]);
  const [productPrice, setProductPrice] = useState(0);
  const [productDesc, setProductDesc] = useState('');
  const [discount, setDiscount] = useState(0);
  const [stock, setStock] = useState(0);
  const [keywords, setKeywords] = useState([]);
  const [open, setopen] = useState(false);
  const [adaptiveThumbnails, setAdaptiveThumbnails] = useState({});

  console.log(adaptiveThumbnails);


  function isMainAdmin() {
    if (ADMIN.includes(id))
      return true;
    else
      return false;
  }

  const history = useHistory();

  const { data, queryDoc, isLastPage } = products;

  useEffect(() => {
    dispatch(
      fetchProductsStart()
    );
  }, []);

  const toggleModal = () => setHideModal(!hideModal);

  const configModal = {
    hideModal,
    toggleModal
  };

  const resetForm = () => {
    setHideModal(true);
    setMainCategory('');
    setProductCategory('womens');
    setProductSize([]);
    setProductName('');
    setProductBrand('');
    setProductColor([]);
    setProductThumbnail([]);
    setProductPrice(0);
    setProductDesc('');
    setDiscount(0);
    setStock(0);
    setKeywords([]);
    setAdaptiveThumbnails({});
  };

  const createKeywords = (name) => {
    const arrWord = [];
    let curWord = '';
    name.split('').forEach(element => {
      curWord += element;
      arrWord.push(curWord);
    });
    return arrWord;
  }

  const generateKeywotds = () => {
    const word = productName.toLocaleLowerCase();
    const bk = brand.toLocaleLowerCase();
    const keyword = word.split(' ');
    var withoutSpaces = [];
    var key = [];
    var all = [];
    var attach = [];
    var long = [];
    var xl = [];
    var xxl = [];
    var br = [];
    const remspace = word.replaceAll(" ", "");
    br = createKeywords(`${bk}`)
    for (let i = 0; i < keyword.length; i++) {
      key[i] = keyword[i];
    }
    const entire = createKeywords(`${word}`)
    if (keyword.length > 1) {
      withoutSpaces = createKeywords(`${remspace}`)
    }
    if (keyword.length === 2) {
      all = createKeywords(`${key[1]}`)
      //setA(all);
    }
    if (keyword.length === 3) {
      all = createKeywords(`${key[1]} ${key[2]}`);
      attach = createKeywords(`${key[2]}`);
      //setA(all);
    }
    if (keyword.length === 4) {
      all = createKeywords(`${key[1]} ${key[2]}  ${key[3]}`);
      attach = createKeywords(`${key[2]} ${key[3]}`);
      long = createKeywords(`${key[3]}`);
      //setA(all);
    }
    if (keyword.length === 5) {
      all = createKeywords(`${key[1]} ${key[2]} ${key[3]} ${key[4]}`);
      attach = createKeywords(`${key[2]} ${key[3]} ${key[4]}`);
      long = createKeywords(` ${key[3]} ${key[4]}`);
      xl = createKeywords(`${key[4]}`);
      //setA(all);
    }
    if (keyword.length === 6) {
      all = createKeywords(`${key[1]} ${key[2]} ${key[3]} ${key[4]} ${key[5]}`);
      attach = createKeywords(`${key[2]} ${key[3]} ${key[4]} ${key[5]}`);
      long = createKeywords(` ${key[3]} ${key[4]} ${key[5]}`);
      xl = createKeywords(`${key[4]} ${key[5]}`);
      xxl = createKeywords(`${key[5]}`);
    }
    const singleArr = [...withoutSpaces, ...entire, ...all, ...attach, ...long, ...xl, ...xxl, ...br, ...productColor];
    setKeywords(singleArr);
  }


  function clearInput() {
    document.getElementById("fileInput").value = '';
    setImages([]);
  }

  const handleChange = (e) => {
    for (let i = 0; i < e.target.files.length; i++) {
      const newImage = e.target.files[i];
      setImages((prevState) => [...prevState, newImage]);
    }
  };

  const handleUpload = () => {
    setUploading(true);
    const promises = [];
    images.map((image) => {

      const uploadTask = storage.ref(`Product/${image.name}`).put(image);
      promises.push(uploadTask)
      uploadTask.on(
        "state_changed",
        (snapshot) => { },
        error => {
          //console.log(error);
        },
        async () => {
          await storage
            .ref("Product")
            .child(image.name)
            .getDownloadURL()
            .then((url) => {
              setProductThumbnail((prevState) => [...prevState, url]);
            });
        }
      )
      Promise.all(promises)
        .then(() => alert("uploded"), clearInput()).then(() => setUploading(false))
        .catch((err) => console.log(err));
    });


  };

  const createGoogleContent = () => {
    contentApi.post('', {
      "kind": "content#product",
      "offerId": "1111111111",
      "title": "Google Tee Black",
      "description": "The Black Google Tee is available in unisex sizing.",
      "link": "http://my.site.com/blacktee/",
      "imageLink": "https://shop.example.com/.../images/GGOEGXXX1100.jpg",
      "contentLanguage": "en",
      "targetCountry": "US",
      "channel": "online",
      "ageGroup": "adult",
      "availability": "in stock",
      "availabilityDate": "2019-01-25T13:00:00-08:00",
      "brand": "Google",
      "color": "black",
      "condition": "new",
      "gender": "male",
      "googleProductCategory": "1604",
      "gtin": "608802531656",
      "itemGroupId": "google_tee",
      "mpn": "608802531656",
      "price": {
        "value": "21.99",
        "currency": "USD"
      },
      "sizes": [
        "Large"
      ]
    }
    )

  }

  const endres = {};

  const set = (a, b) => {
    endres[a] = b;
    console.log(endres)
  };

  console.log(productThumbnail);

  const final = () => {
    setAdaptiveThumbnails({
      colors: productColor,
      map: endres
    })
    console.log(adaptiveThumbnails)
  }


  const handleSubmit = e => {
    e.preventDefault();

    dispatch(
      addProductStart({
        mainCategory,
        productCategory,
        productSize,
        productName,
        brand,
        productColor,
        productThumbnail,
        productPrice,
        productDesc,
        discount,
        stock,
        keywords,
        adaptiveThumbnails
      })
    );
    resetForm();

  };

  const handleLoadMore = () => {
    dispatch(
      fetchProductsStart({
        startAfterDoc: queryDoc,
        persistProducts: data
      })
    );
  };

  const configLoadMore = {
    onLoadMoreEvt: handleLoadMore,
  };

  const redirectToProduct = (id) => {
    sessionStorage.setItem('NoOfProducts', data.length);
    sessionStorage.setItem('scrool', window.scrollY);
    history.push(`/edit/${id}`)
  }

  const deleteProduct = (id) => {
    if (isMainAdmin()) {
      dispatch(deleteProductStart(id))
    }
    else {
      setopen(true);
    }
  }

  const scrool = sessionStorage.getItem('scrool');
  useEffect(() => {
    if (Array.isArray(data))
      sessionStorage.setItem("noOfProducts", data.length);
    if (scrool > 100) {
      window.scrollTo(0, 0);
      window.scrollTo(0, scrool);

    }
  }, [data])


  return (
    <div className="admin">
      <SimpleDialog open={open} onClose={() => setopen(false)} text={"You are not Yashwanth to delete Me! <br /> GET LOST !"} />

      <div className="callToActions">
        <ul>
          <li>
            <Button onClick={() => toggleModal()}>
              Add new product
            </Button>
          </li>
        </ul>
      </div>

      <Modal {...configModal}>
        <div className="addNewProductForm">
          <form >

            <h2>
              Add new product
            </h2>

            <FormSelect
              label="Main Category"
              options={[{
                value: "apparel",
                name: "Apparel"
              }, {
                value: "living",
                name: "Living"
              }
              ]}
              handleChange={e => setMainCategory(e.target.value)}
            />

            <FormSelect
              label="Category"
              options={mainCategory === 'apparel' ? [{
                value: "womens",
                name: "Womens"
              }, {
                value: "mens",
                name: "Mens"
              }] : [{
                value: "frames",
                name: "Framed Poster"
              }, {
                value: "canvas",
                name: "Canvas"
              }]}
              handleChange={e => setProductCategory(e.target.value)}
            />

            <FormInput
              label="Name"
              type="text"
              value={productName}
              handleChange={e => setProductName(e.target.value)}
            />

            <FormInput
              label="Brand"
              type="text"
              value={brand}
              handleChange={e => setProductBrand(e.target.value.toUpperCase())}
            />

            <FormInput
              label="Color"
              type="text"
              value={productColor}
              handleChange={e => setProductColor(e.target.value.toLowerCase().split(","))}
            />

            <button type="button" disabled={keywords.length > 100} onClick={generateKeywotds} >Generate Keywords</button>

            <br />

            <div>
              <br />
              {uploading ? <CircularProgress style={{ marginLeft: "45%", alignSelf: "center", marginTop: "10%", marginBottom: "15%" }} color="inherit" /> :
                (typeof (productThumbnail) === "object") && productThumbnail.length > 0 ?
                  productThumbnail.map((url, index) => {
                    return (
                      <div key={index} style={{ display: "inline" }} >
                        <img style={{ padding: "2%", backgroundColor: "lightgray" }} key={index} width="30%" src={url} />
                        <input onKeyDown={(e) => e.which === 191 && set(e.target.value, url)} />
                      </div>
                    )
                  }) : <h1 style={{ width: "30%", marginLeft: 0, color: "lightgray" }} >Upload Images to view</h1>}
              <br />

              <input id="fileInput" type="file" multiple onChange={handleChange} />
              <button disabled={images.length > 0 ? false : true} type="button" onClick={handleUpload}>Upload</button> <br />

              <textarea rows='10' cols='40' value={JSON.stringify(adaptiveThumbnails)} />
              <button type="button" onClick={final}> Assign</button>



            </div>


            <MultipleSelect
              personName={productSize}
              const sizes={mainCategory === 'apparel' ? [
                'XS',
                'S',
                'M',
                'L',
                'XL',
                '2XL',
              ] : [
                '8 x 8in',
                '8 x 12in',
                '8.3 x 11.7in (A4)',
                '11.7 x 16.5in (A3)',
                '12 x 12in',
                '15 x 20in',
                '20 x 30in'

              ]}

              handleChange={e => setProductSize(e.target.value)}

            />

            <FormInput
              label="Main image URL"
              type="url"
              value={productThumbnail}
              handleChange={e => setProductThumbnail(e.target.value)}
            />


            <FormInput
              label="Price"
              type="number"
              min="0.00"
              max="10000.00"
              step="1"
              value={productPrice}
              handleChange={e => setProductPrice(e.target.value)}
            />
            <FormInput
              label="Discount"
              type="number"
              min="0"
              max="100"
              step="1"
              value={discount}
              handleChange={e => setDiscount(e.target.value)}
            />

            <FormInput
              label="STOCK"
              type="number"
              min="0"
              max="100"
              step="1"
              value={stock}
              handleChange={e => setStock(e.target.value)}
            />

            <CKEditor
              onChange={evt => setProductDesc(evt.editor.getData())}
            />

            <br />

            <Button onClick={handleSubmit}>
              Add product
            </Button>

          </form>
        </div>
      </Modal>

      <div className="manageProducts">

        <table border="0" cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <th>
                <h1>
                  Manage Products
                </h1>
              </th>
            </tr>
            <tr>
              <td>
                <table className="results" border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    {(Array.isArray(data) && data.length > 0) && data.map((product, index) => {
                      const {
                        productName,
                        productThumbnail,
                        productPrice,
                        documentID
                      } = product;

                      return (
                        <tr key={index}>
                          <td>
                            <img className="thumb" src={productThumbnail} />
                          </td>
                          <td>
                            {productName}
                          </td>
                          <td>
                            &#x20b9;{productPrice}
                          </td>
                          <td>
                            <Button onClick={() => redirectToProduct(documentID)} >
                              Edit
                            </Button>
                            <br />
                            <Button onClick={() => deleteProduct(documentID)}>
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>

              </td>
            </tr>
            <tr>
              <td>
                <table border="0" cellPadding="10" cellSpacing="0">
                  <tbody>
                    <tr>
                      <td>
                        {!isLastPage && (
                          <LoadMore {...configLoadMore} />
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>

      </div>

    </div>
  );
}

export default Admin;