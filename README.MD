# Simple example to create a pizza menu

In this application I gonna show you how can do a schema with mongoose, you can see this examples in src/app/models. Also how can I use this models to apply in yours use case. To see more example look for this folders: src/useCases/*

## NOTE

This is a simple example to see examples of mongoose, express, multer and path.

### Models with moongose

```ts
import { model, Schema } from 'mongoose';

export const Product = model(
  'Product',
  new Schema({
    name: {
      type: Schema.Types.String,
      required: true
    },
    description: {
      type: Schema.Types.String,
      required: true
    },
    imagePath: {
      type: Schema.Types.String,
      required: true
    },
    price: {
      type: Schema.Types.Number,
      required: true
    },
    ingredients: {
      type: [
        {
          name: { type: Schema.Types.String, required: true },
          icon: { type: Schema.Types.String, required: true }
        }
      ]
    },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Category'
    }
  })
);
```

### Simple use cases example

```ts
import { Request, Response } from 'express';
import { Product } from '../../models/Product';

export async function createProducts(req: Request, res: Response) {
  try {
    const imagePath = req.file?.filename;
    const { name, description, price, category, ingredients } = req.body;

    if (!name) {
      res.status(400).json({
        error: 'name of product is required'
      });
    }

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      imagePath,
      ingredients: ingredients ? JSON.parse(ingredients) : []
    });

    res.status(201).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}


```
