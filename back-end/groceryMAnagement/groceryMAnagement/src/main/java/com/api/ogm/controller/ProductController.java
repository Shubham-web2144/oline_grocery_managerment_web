package com.api.ogm.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;

import com.api.ogm.service.ProductService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

import com.api.ogm.exceptions.NullValueException;
import com.api.ogm.model.ProductModel;


@RestController
@CrossOrigin(origins = "http://localhost:7080")
public class ProductController {
    

    @Autowired
    private ProductService productService;

    @GetMapping(value="/products")
    public ResponseEntity<?> getProducts() {
        List<ProductModel> products = productService.getAllProducts();
        if(products == null) {
        	return new ResponseEntity<>("Product list is empty", HttpStatus.OK);
        }
        return new ResponseEntity<>(products, HttpStatus.OK);
    }
    
    @PostMapping("/createProduct")
    public ResponseEntity<?> createProduct(@RequestBody ProductModel product) throws NullValueException {
    	ProductModel p = productService.createProduct(product);
    	if(p == null) {
    		throw new NullValueException("Product is not saved, Null value exception");
    	}
    	return new ResponseEntity<>(p, HttpStatus.CREATED);
    }
    
    @PutMapping("/updateProduct/{productId}")
    public ResponseEntity<?> updateProduct(@PathVariable int productId, @RequestBody ProductModel product) throws NullValueException {
    	ProductModel p = productService.updateProduct(productId, product);
    	
    	if(p == null) {
    		throw new NullValueException("Product is not updated, Null value exception");
    	}
    	return new ResponseEntity<>(p, HttpStatus.CREATED);
    }
    
    @PutMapping("/updateView/{productId}")
    public ResponseEntity<?> updateProductView(@PathVariable int productId) {
    	int updatedResult = productService.updateProductView(productId);
    	if(updatedResult > 0) {
    		return new ResponseEntity<>(updatedResult, HttpStatus.OK);
    	}
    	return new ResponseEntity<>("Product error", HttpStatus.FORBIDDEN);
    }
    
    
    @GetMapping("/product/{productId}")
    public ResponseEntity<?> getProduct(@PathVariable int productId) throws NullValueException {
    	ProductModel p = productService.getProductModel(productId);
    	if(p == null) {
    		throw new NullValueException("Product is not found, Null value exception");
    	}
    	return new ResponseEntity<>(p, HttpStatus.OK);
    }
    
    @DeleteMapping("/product/{productId}")
    public ResponseEntity<?> deleteProduct(@PathVariable int productId)  {
    	String msg = productService.deleteProduct(productId);
    	if(msg.equals("success")) {
    		return new ResponseEntity<>("Product deleted...", HttpStatus.OK);
    	}
    	return new ResponseEntity<>("Product Not found", HttpStatus.NOT_FOUND);
    }
    
}
