import React from 'react'
import './MenuView.css'
import ProductCard from './ProductCard'

export default function MenuView() {
  return (
    <>
        <div class = "container menu-view-container">
            <div class = "row category-title align-middle">
                Feel Energized
            </div>
            <div class = "row product-card-row">
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
            </div>

            <div class = "row category-title">
                Get Fit
            </div>
            <div class = "row product-card-row">
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
            </div>

            <div class = "row category-title">
                Manage Weight
            </div>
            <div class = "row product-card-row">
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
            </div>

            <div class = "row category-title">
                Be Well
            </div>
            <div class = "row product-card-row">
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
            </div>

            <div class = "row category-title">
                Enjoy A Treat
            </div>
            <div class = "row product-card-row">
                <ProductCard productName = {"Strawberry kiwi breeze"}></ProductCard>
            </div>

        </div>
    
    </>
  )
}
