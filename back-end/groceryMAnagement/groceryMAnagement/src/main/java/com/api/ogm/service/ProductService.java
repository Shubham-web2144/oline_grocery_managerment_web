package com.api.ogm.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.api.ogm.model.ProductModel;

@Service
public interface ProductService {

    // get all products
    public List<ProductModel> getAllProducts();
    
    // create product
    public ProductModel createProduct(ProductModel productModel);

    // update uproduct

    public ProductModel updateProduct(int id, ProductModel newProductModel);
    
    public int updateProductView(int productId);

    // delete product
    public String deleteProduct(int id);

    // get product by id
    public ProductModel getProductModel(int id);
}
