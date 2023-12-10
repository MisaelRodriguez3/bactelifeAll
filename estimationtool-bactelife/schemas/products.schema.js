import { z } from 'zod';

export const createProductSchema = z.object({
  Gal_Product: z.number({
    required_error: "Gal_Product is required",
  }),
  Oz_Product: z.number({
    required_error: "Oz_Product is required",
  }),
  ml_Product: z.number({
    required_error: "ml_Product is required",
  }),
  Gal_Water: z.number({
    required_error: "Gal_Water is required",
  }),
  L_Water: z.number({
    required_error: "L_Water is required",
  }),
  Acre: z.number({
    required_error: "Acre is required",
  }),
  Ha: z.number({
    required_error: "Ha is required",
  }),
  Price: z.number({
    required_error: "Price is required",
  }),
});

export const updateProductSchema = z.object({
  Gal_Product: z
    .number({
      required_error: "Gal_Product is required",
    })
    .optional(),
  Oz_Product: z
    .number({
      required_error: "Oz_Product is required",
    })
    .optional(),
  ml_Product: z
    .number({
      required_error: "ml_Product is required",
    })
    .optional(),
  Gal_Water: z
    .number({
      required_error: "Gal_Water is required",
    })
    .optional(),
  L_Water: z
    .number({
      required_error: "L_Water is required",
    })
    .optional(),
  Acre: z
    .number({
      required_error: "Acre is required",
    })
    .optional(),
  Ha: z
    .number({
      required_error: "Price is required",
    })
    .optional(),
  Price: z
    .number({
      required_error: "Price is required",
    })
    .optional(),
});
