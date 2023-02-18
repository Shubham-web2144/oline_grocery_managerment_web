package com.api.ogm.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.ogm.model.ProductModel;

@Repository
public interface ProductRepo extends JpaRepository<ProductModel, Integer> {
    
}
