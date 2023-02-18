package com.api.ogm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ProductModel")
public class ProductModel {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int productId;

	private String productName;
	private String description;
	private String mfgBy;
	private int quantity;
	private float price;
	private int view;
	private String lastUpdatedBy;

	public ProductModel(int productId, String productName, String description, String mfgBy, int quantity, float price,
			int view) {
		super();
		this.productId = productId;
		this.productName = productName;
		this.description = description;
		this.mfgBy = mfgBy;
		this.quantity = quantity;
		this.price = price;
		this.view = view;
	}

	public ProductModel() {
	}

	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getMfgBy() {
		return mfgBy;
	}

	public void setMfgBy(String mfgBy) {
		this.mfgBy = mfgBy;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public int getView() {
		return view;
	}

	public void setView(int view) {
		this.view = view;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getLastUpdatedBy() {
		return lastUpdatedBy;
	}

	public void setLastUpdatedBy(String lastUpdatedBy) {
		this.lastUpdatedBy = lastUpdatedBy;
	}

}
