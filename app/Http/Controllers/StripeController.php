<?php

namespace App\Http\Controllers;

use Laravel\Cashier\Cashier;

class StripeController extends Controller
{
    public function getPlans()
    {
        $products = Cashier::stripe()->products->all(['active' => true]);
        $prices = Cashier::stripe()->prices->all(['active' => true]);
        return array_map(function ($product) use ($prices) {
            $priceArr = array_filter($prices->data, function ($price) use ($product) {
                return $price->product == $product->id;
            });
            $price = $priceArr ? array_values($priceArr)[0] : null;
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'images' => $product->images,
                'metadata' => $product->metadata,
                'features' => $product->features,
                'price' => $price?->unit_amount / 100,
                'price_id' => $price?->id,
                'currency' => $price?->currency,
            ];
        }, $products->data);
    }
}
