import { setRef } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { firestore } from '../../firebase/utils';
import { fetchProductStart, updateProduct } from '../../redux/Products/products.actions';

const mapState = state => ({
    product: state.productsData.product
});

const Edit = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { product } = useSelector(mapState);

    const {
        mainCategory,
        productName,
        productPrice,
        productDesc,
        productColor,
        productType,
        discount,
        keywords,
        productCategory,
        productSize,
        brand,
        documentID,
        productThumbnail,
        adaptiveThumbnails
    } = product;

    const [ename, setEname] = useState(productName);
    const [ebrand, setEbrand] = useState(brand);
    const [eprice, setEprice] = useState(productPrice);
    const [ediscount, setEdiscount] = useState(discount);
    const [ekeywords, setEkeywords] = useState(keywords);
    const [edesc, setEdesc] = useState(productDesc);
    const [emainCategory, setEmaincategory] = useState(mainCategory);
    const [ecategory, setEcategory] = useState(productCategory);
    const [eproductSize, setEproductSize] = useState(productSize);
    const [etype, setEtype] = useState(productType);
    const [edocID, setEdocID] = useState(ename);
    const [ecolors, setEcolors] = useState(productColor);
    const [newthumbnails, setNewthumbnails] = useState(adaptiveThumbnails);
    const [ethumbnails, setEthumbnails] = useState(productThumbnail);






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
        const word = ename.toLocaleLowerCase();
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
        const singleArr = [...withoutSpaces, ...entire, ...all, ...attach, ...long, ...xl, ...xxl, ...br];
        setEkeywords(singleArr);
    }





    const changeDocID = (id) => {
        firestore.collection("products").doc(documentID).get().then(function (doc) {

            if (doc && doc.exists) {
                var data = doc.data();
                firestore.collection("products").doc(id).set(data)
                    .then(
                        firestore.collection("products").doc(documentID).delete().then(
                            history.replace(`/edit/${id}`)
                        )
                    )
                    .catch(err => console.log(err))
            }
        }
        )
    }



    // for (let i = 0; i < productColor.length; i++) {
    //     endres[productColor[i]] = productThumbnail[i];
    // }
    // console.log(endres);



    useEffect(() => {
        setEname(productName);
        setEbrand(brand);
        setEprice(productPrice);
        setEdiscount(discount);
        setEkeywords(keywords);
        setEdesc(productDesc);
        setEmaincategory(mainCategory);
        setEcategory(productCategory);
        setEproductSize(productSize);
        setEtype(productType);
        setEdocID(productName);
        setNewthumbnails(adaptiveThumbnails);
        setEcolors(productColor);
        setEthumbnails(productThumbnail);

    }, [product])



    const endres = {};

    const set = (a, b) => {
        endres[a] = b;
        console.log(endres)
    };

    console.log(ethumbnails);

    const final = () => {
        setNewthumbnails({
            colors: ecolors,
            map: endres
        })
        console.log(newthumbnails)
    }



    const submit = () => {

        dispatch(
            updateProduct(documentID, {
                mainCategory: emainCategory,
                productCategory: ecategory,
                productName: ename,
                brand: ebrand,
                productColor: ecolors,
                productPrice: eprice,
                discount: ediscount,
                keywords: ekeywords ? ekeywords : '',
                productType: etype ? etype : '',
                productDesc: edesc ? edesc : '',
                adaptiveThumbnails: newthumbnails ? newthumbnails : '',
                productThumbnail: ethumbnails,
            })
        );
    }






    if (!documentID || !productThumbnail || !productName || !productSize || !mainCategory || !keywords || !discount || !ethumbnails ||
        typeof productPrice === 'undefined')
        return null;


    adaptiveThumbnails && Object.keys(adaptiveThumbnails.map).map((val, i) => {
        if (i === Object.values(adaptiveThumbnails.map).indexOf(productThumbnail[0]))
            console.log(val)
    }
    );



    return (
        <div >
            <h4>
                Main Category: <input value={emainCategory} onChange={(e) => setEmaincategory(e.target.value)} /> <br />
                Category: <input value={ecategory} onChange={(e) => setEcategory(e.target.value)} /> <br />
                Type: <input value={etype} onChange={(e) => setEtype(e.target.value)} /> <br />
                Name: <input value={ename} onChange={(e) => setEname(e.target.value)} /> <br />
                Brand:<input value={ebrand} onChange={(e) => setEbrand(e.target.value)} /> <br />
                Price:<input value={eprice} onChange={(e) => setEprice(e.target.value)} /> <br />
                Colors:<input value={ecolors} onChange={(e) => setEcolors(e.target.value.toLowerCase().split(','))} /> <br />
                Discount: <input value={ediscount} onChange={(e) => setEdiscount(e.target.value)} /><br />
                Thumbnails: <textarea value={ethumbnails} rows='5' cols='40' onChange={(e) => setEthumbnails(e.target.value.split(','))} /> <br />
                Description : <textarea value={edesc} rows='10' cols='40' onChange={(e) => setEdesc(e.target.value)} /> <br />
                Keywords: <textarea value={ekeywords} rows='5' cols='40' onChange={(e) => setEkeywords(e.target.value)} /> <button onClick={generateKeywotds} > Gen </button> <br />
                Existing Id:<input value={documentID} />
                Editable Id:  <input value={edocID} onChange={(e) => setEdocID(e.target.value.toLowerCase().trim().replaceAll(' ', ''))} />
                <button onClick={() => documentID !== edocID ? changeDocID(ename && ename.toLowerCase().trim().replaceAll(' ', '')) : alert('Already Edited')} > Change ID </button><br />
                Images:
                {ethumbnails.map((src, i) => (
                    <div key={i} >
                        <img width={100} src={src} alt={productName} />
                        <input value={src} />

                        <input placeholder={adaptiveThumbnails && Object.values(adaptiveThumbnails.map).indexOf(src) !== -1 ?
                            Object.keys(adaptiveThumbnails.map).map((val, i) => {
                                if (i === Object.values(adaptiveThumbnails.map).indexOf(src))
                                    return val;
                            })
                            : 'none'}
                            onKeyDown={(e) => e.which === 13 && set(e.target.value, src)} ></input>
                    </div>
                ))}
                <button onClick={() => final(endres)}>Assign</button>
                AdaptiveThumbnails: <small> {JSON.stringify(newthumbnails)} </small>



                {/* Image : {productThumbnail} <br />
            <img width="50%" src={productThumbnail} /> <br /> */}
                {/* KeyWords: {keywords} <br /> */}
                {/* Category:<input value={ecategory} onChange={(e) => setEcategory(e.target.value)} /> <br />
            Desc: <input value={edesc} onChange={(e) => setEdesc(e.target.value)} /> <br />
            Sizes: {eproductSize} <br /> */}
            </h4>
            <button onClick={submit} >Edit</button>


        </div>
    )
}

export default Edit
