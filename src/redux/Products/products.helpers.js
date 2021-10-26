import { firestore } from './../../firebase/utils';

export const handleAddProduct = product => {
  const docID = product.productName.replaceAll(' ', '').toLowerCase();
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(docID)
      .set(product)
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleUpdateProduct = payload => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(payload.productID)
      .update(payload.data)
      .then(() => {
        alert('Updated');
        resolve();
      })
      .catch(err => {
        alert('Error')
        reject(err);
      })
  });

}

export const handleFetchProducts = ({ cat, filterStore, filterType, searh, startAfterDoc, persistProducts = [] }) => {
  return new Promise((resolve, reject) => {
    const prevPageSize = sessionStorage.getItem("noOfProducts");
    const presetPageSize = 12;
    var pageSize = 12;
    if (prevPageSize && prevPageSize > 12) {
      pageSize = prevPageSize
      sessionStorage.removeItem("noOfProducts");
    }
    if (searh !== undefined && searh !== null)
      pageSize = 12;

    let ref = firestore.collection('products').orderBy("createdDate", "desc").limit(pageSize);

    if (cat === 'apparel') {
      ref = ref.where("mainCategory", "==", "apparel");
      if (filterStore === "rediva") ref = ref.where("brand", "==", "REDIVA");
      if ((filterType === "mens" || filterType === "womens")) ref = ref.where("productCategory", "==", filterType);
    }
    if (cat === 'living') {
      ref = ref.where("mainCategory", "==", "living");
      if (filterStore === "rediva") ref = ref.where("brand", "==", "REDIVA");
      if ((filterType === "frames" || filterType === "canvas")) ref = ref.where("productCategory", "==", filterType);
    }
    if (searh !== null && searh !== undefined) ref = ref.where("keywords", "array-contains", searh);

    if (startAfterDoc) ref = ref.startAfter(startAfterDoc);

    ref
      .get()
      .then(snapshot => {
        const totalCount = snapshot.size;

        const data = [
          ...persistProducts,
          ...snapshot.docs.map(doc => {
            return {
              ...doc.data(),
              documentID: doc.id,
              discountedPrice: Math.trunc(doc.data().discount ? doc.data().productPrice * (100 - doc.data().discount) / 100 : null)
            }
          })
        ];

        resolve({
          data,
          queryDoc: snapshot.docs[totalCount - 1],
          isLastPage: totalCount % presetPageSize !== 0
        });
      })
      .catch(err => {
        reject(err);
      })
  })
}

export const handleDeleteProduct = documentID => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(documentID)
      .delete()
      .then(() => {
        resolve();
      })
      .catch(err => {
        reject(err);
      })
  });
}

export const handleFetchProduct = (productID) => {
  return new Promise((resolve, reject) => {
    firestore
      .collection('products')
      .doc(productID)
      .get()
      .then(snapshot => {

        if (snapshot.exists) {
          resolve({
            ...snapshot.data(),
            documentID: productID,
            discountedPrice: Math.trunc(snapshot.data().discount ? snapshot.data().productPrice * (100 - snapshot.data().discount) / 100 : null),
          });
        }
      })
      .catch(err => {
        reject(err);
      })
  })
}