/**
 * Mock data for testing the product submission system
 * Use these examples to test the application functionality
 */

export const mockProducts = [
  {
    productName: "Pure Organic Honey",
    productType: "Food",
    description: "Raw, unfiltered organic honey harvested from wildflower meadows. Rich in natural enzymes and antioxidants.",
    answers: {
      food_preservatives: "No",
      food_organic: "Yes",
      food_allergens: "None",
      food_expiry: "> 6 months",
      food_packaging: "Glass"
    }
  },
  {
    productName: "Hyaluronic Acid Face Serum",
    productType: "Cosmetic",
    description: "Hydrating face serum with pure hyaluronic acid for all skin types. Vegan and cruelty-free.",
    answers: {
      cosmetic_cruelty_free: "Yes",
      cosmetic_parabens: "No",
      cosmetic_vegan: "Yes",
      cosmetic_ingredients: "Hyaluronic acid, Vitamin E, Aloe vera",
      cosmetic_skin_type: "All skin types"
    }
  },
  {
    productName: "EcoPods Pro",
    productType: "Electronics",
    description: "True wireless earbuds with active noise cancellation and 30-hour battery life. Made with recycled materials.",
    answers: {
      electronics_warranty: "2+ years",
      electronics_energy_rating: "A+",
      electronics_recyclable: "Yes",
      electronics_certifications: "CE, FCC, RoHS, Energy Star",
      electronics_battery: "Yes"
    }
  },
  {
    productName: "Classic Organic Cotton Tee",
    productType: "Clothing",
    description: "Soft, breathable t-shirt made from 100% GOTS-certified organic cotton. Fair trade certified.",
    answers: {
      clothing_material: "100% organic cotton (GOTS certified)",
      clothing_sustainable: "Yes",
      clothing_ethical: "Yes",
      clothing_care: "Machine washable",
      clothing_origin: "India (Fair Trade certified facility)"
    }
  },
  {
    productName: "Eco Bamboo Toothbrush",
    productType: "Other",
    description: "Biodegradable bamboo toothbrush with charcoal-infused bristles. Plastic-free packaging.",
    answers: {
      default_recyclable: "No (but biodegradable)",
      default_ethical: "Yes",
      default_materials: "Bamboo handle, charcoal-infused nylon bristles",
      default_sustainability: "100% biodegradable handle, plastic-free packaging, carbon neutral shipping"
    }
  }
];

/**
 * Function to submit mock products (for testing)
 * Usage: Import this in your component and call submitMockProducts()
 */
export async function submitMockProducts(apiUrl = '/api') {
  const results = [];
  
  for (const product of mockProducts) {
    try {
      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });
      
      const data = await response.json();
      results.push({ success: true, product: product.productName, data });
    } catch (error) {
      results.push({ success: false, product: product.productName, error });
    }
  }
  
  return results;
}
