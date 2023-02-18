package com.api.ogm.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.api.ogm.model.ProductModel;
import com.api.ogm.repo.ProductRepo;

@Service
public class ProductServiceImp implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Override
    public List<ProductModel> getAllProducts() {
        List<ProductModel> products =  productRepo.findAll();
        if(products.isEmpty()) {
        	return null;
        }
        return products;
    }

	@Override
	public ProductModel createProduct(ProductModel productModel) {
		ProductModel p = productRepo.save(productModel);
		return p;
	}

	@Override
	public ProductModel updateProduct(int id, ProductModel newProductModel) {
		ProductModel p = productRepo.findById(id).isPresent() ? productRepo.findById(id).get() : null;
		
		if(p != null) {
			p.setProductName(newProductModel.getProductName());
			p.setDescription(newProductModel.getDescription());
			p.setMfgBy(newProductModel.getMfgBy());
			p.setQuantity(newProductModel.getQuantity());
			p.setPrice(newProductModel.getPrice());
			p.setLastUpdatedBy(newProductModel.getLastUpdatedBy());
			return productRepo.save(p);
		}
		
		return p;
	}

	@Override
	public String deleteProduct(int id) {
		ProductModel p = productRepo.findById(id).isPresent() ? productRepo.findById(id).get() : null;
		if(p != null) {
			productRepo.deleteById(id);
			return "success";
		}
		return "error";
	}

	@Override
	public ProductModel getProductModel(int id) {
		return productRepo.findById(id).isPresent() ? productRepo.findById(id).get() : null;
	}

	@Override
	public int updateProductView(int productId) {
		ProductModel p = productRepo.findById(productId).isPresent() ? productRepo.findById(productId).get() : null;
		if(p != null) {
			p.setView(p.getView() + 1);
			productRepo.save(p);
			return p.getView();
		}
		return 0;
		
	}
    
    
}
