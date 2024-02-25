<?php

namespace App\Http\Controllers;

use Laravel\Cashier\Cashier;

class StripeController extends Controller
{
    public function getPlans()
    {
        $products = Cashier::stripe()->products->all();
        $prices = Cashier::stripe()->prices->all();
        return array_map(function ($product) use ($prices) {
            $price = array_filter($prices->data, function ($price) use ($product) {
                return $price->product == $product->id;
            })[0];
            return [
                'id' => $product->id,
                'name' => $product->name,
                'description' => $product->description,
                'images' => $product->images,
                'metadata' => $product->metadata,
                'features' => $product->features,
                'price' => $price->unit_amount / 100,
                'currency' => $price->currency,
            ];
        }, $products->data);
    }
}
