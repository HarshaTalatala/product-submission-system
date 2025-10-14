/**
 * AI Service for Dynamic Question Generation
 * 
 * This is a rule-based simulation of an AI service that generates
 * contextual follow-up questions based on product type.
 * 
 * In a production environment, this would call an actual AI service
 * like OpenAI GPT, Google's Gemini, or a custom ML model.
 */

/**
 * Question database organized by product type
 * Each question has an id, text, type (for UI rendering), and optional choices
 */
const questionDatabase = {
  Food: [
    {
      id: 'food_preservatives',
      question: 'Does this product contain any artificial preservatives or chemical additives?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Helps consumers identify products with natural ingredients'
    },
    {
      id: 'food_organic',
      question: 'Is this product certified organic by recognized certification bodies (USDA, EU Organic, etc.)?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Indicates adherence to organic farming standards'
    },
    {
      id: 'food_allergens',
      question: 'Please list all potential allergens present in this product (nuts, dairy, gluten, soy, eggs, shellfish, etc.)',
      type: 'text',
      placeholder: 'e.g., Contains: Milk, Soy. May contain traces of: Tree nuts',
      description: 'Critical information for consumers with food allergies or intolerances'
    },
    {
      id: 'food_nutritional',
      question: 'What are the key nutritional highlights of this product?',
      type: 'text',
      placeholder: 'e.g., High in protein, Low in sugar, Rich in Omega-3',
      description: 'Helps health-conscious consumers make informed decisions'
    },
    {
      id: 'food_expiry',
      question: 'What is the typical shelf life and recommended storage conditions?',
      type: 'select',
      choices: ['Less than 7 days (Highly Perishable)', '1-4 weeks (Perishable)', '1-6 months (Moderate Shelf Life)', '6-12 months (Long Shelf Life)', 'Over 12 months (Extended Shelf Life)'],
      description: 'Ensures proper storage and consumption timing'
    },
    {
      id: 'food_packaging',
      question: 'What type of environmentally-conscious packaging is used for this product?',
      type: 'select',
      choices: ['100% Recyclable Plastic', 'Glass (Reusable)', 'Metal/Aluminum', '100% Biodegradable', 'Compostable Paper/Cardboard', 'Multi-Material (Partially Recyclable)'],
      description: 'Supports sustainable consumption and proper waste management'
    },
    {
      id: 'food_certifications',
      question: 'What quality certifications or standards does this product meet?',
      type: 'text',
      placeholder: 'e.g., FDA Approved, ISO 22000, HACCP, Kosher, Halal',
      description: 'Demonstrates compliance with food safety and quality standards'
    }
  ],
  
  Cosmetic: [
    {
      id: 'cosmetic_cruelty_free',
      question: 'Is this product cruelty-free and not tested on animals (certified by PETA, Leaping Bunny, or similar)?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Important for ethical consumers and animal welfare advocates'
    },
    {
      id: 'cosmetic_parabens',
      question: 'Does this product contain parabens, sulfates, or other controversial preservatives?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Helps consumers avoid potentially harmful chemicals'
    },
    {
      id: 'cosmetic_vegan',
      question: 'Is this product 100% vegan with no animal-derived ingredients?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Essential for vegan lifestyle consumers'
    },
    {
      id: 'cosmetic_ingredients',
      question: 'What are the main active ingredients and their concentrations (if applicable)?',
      type: 'text',
      placeholder: 'e.g., 10% Niacinamide, 2% Hyaluronic Acid, Vitamin C Complex',
      description: 'Allows consumers to understand product efficacy'
    },
    {
      id: 'cosmetic_skin_type',
      question: 'Which skin types and conditions is this product specifically formulated for?',
      type: 'select',
      choices: ['All Skin Types', 'Dry/Dehydrated Skin', 'Oily/Acne-Prone Skin', 'Combination Skin', 'Sensitive/Reactive Skin', 'Mature/Aging Skin'],
      description: 'Ensures appropriate product selection for individual needs'
    },
    {
      id: 'cosmetic_dermatologist',
      question: 'Is this product dermatologically tested and hypoallergenic?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Provides assurance of safety and reduced allergy risk'
    },
    {
      id: 'cosmetic_spf',
      question: 'Does this product contain SPF protection? If yes, what level?',
      type: 'text',
      placeholder: 'e.g., SPF 30, No SPF protection',
      description: 'Critical information for sun protection and daily skincare'
    }
  ],
  
  Electronics: [
    {
      id: 'electronics_warranty',
      question: 'What is the manufacturer warranty period and what does it cover?',
      type: 'select',
      choices: ['No Warranty', '3 Months Limited', '6 Months Limited', '1 Year Comprehensive', '2 Years Extended', '3+ Years Premium Coverage'],
      description: 'Protects consumer investment and ensures product quality'
    },
    {
      id: 'electronics_energy_rating',
      question: 'What is the official energy efficiency rating of this product?',
      type: 'select',
      choices: ['A+++ (Most Efficient)', 'A++ (Very Efficient)', 'A+ (Highly Efficient)', 'A (Efficient)', 'B (Moderate)', 'C or Lower (Less Efficient)', 'Not Rated/Not Applicable'],
      description: 'Helps consumers estimate operating costs and environmental impact'
    },
    {
      id: 'electronics_recyclable',
      question: 'Is this product designed for easy recycling with clearly marked recyclable components?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Supports circular economy and proper e-waste management'
    },
    {
      id: 'electronics_certifications',
      question: 'What safety and quality certifications does this product hold?',
      type: 'text',
      placeholder: 'e.g., CE, FCC, RoHS, UL, Energy Star, ISO 9001',
      description: 'Demonstrates compliance with international safety standards'
    },
    {
      id: 'electronics_battery',
      question: 'Does this product contain rechargeable or replaceable batteries?',
      type: 'select',
      choices: ['No Batteries', 'Replaceable AA/AAA Batteries', 'Replaceable Button Cells', 'Built-in Rechargeable (Non-removable)', 'Built-in Rechargeable (User-replaceable)'],
      description: 'Important for maintenance and environmental disposal'
    },
    {
      id: 'electronics_connectivity',
      question: 'What connectivity and compatibility features does this product offer?',
      type: 'text',
      placeholder: 'e.g., Wi-Fi 6, Bluetooth 5.0, USB-C, Compatible with iOS/Android',
      description: 'Ensures integration with existing devices and systems'
    }
  ],
  
  Clothing: [
    {
      id: 'clothing_material',
      question: 'What is the complete fabric composition and material breakdown?',
      type: 'text',
      placeholder: 'e.g., 95% Organic Cotton, 5% Elastane; Lining: 100% Recycled Polyester',
      description: 'Helps consumers understand comfort, durability, and care requirements'
    },
    {
      id: 'clothing_sustainable',
      question: 'Is this product made from certified sustainable or eco-friendly materials (GOTS, OEKO-TEX, etc.)?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Supports environmentally conscious fashion choices'
    },
    {
      id: 'clothing_ethical',
      question: 'Is this product ethically produced with fair labor practices and transparent supply chain?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Ensures worker welfare and responsible manufacturing'
    },
    {
      id: 'clothing_care',
      question: 'What are the detailed care and maintenance instructions to ensure longevity?',
      type: 'select',
      choices: ['Machine Washable (Cold/Warm)', 'Hand Wash Only (Delicate)', 'Dry Clean Only (Professional)', 'Special Care Required (See Label)', 'No Special Care (Durable)'],
      description: 'Helps maintain product quality and extend garment life'
    },
    {
      id: 'clothing_origin',
      question: 'Where is this product manufactured and what is the country of origin?',
      type: 'text',
      placeholder: 'e.g., Made in Italy, Fabric from Turkey, Assembled in Portugal',
      description: 'Provides transparency about manufacturing location'
    },
    {
      id: 'clothing_sizing',
      question: 'What sizing standard does this product follow and is it true-to-size?',
      type: 'select',
      choices: ['US Standard (True-to-size)', 'European Sizing', 'Asian Sizing (Runs Small)', 'UK Sizing', 'Oversized/Relaxed Fit', 'Custom/Specialty Sizing'],
      description: 'Helps customers select the correct size for best fit'
    }
  ],
  
  Other: [
    {
      id: 'default_recyclable',
      question: 'Is this product recyclable or does it have a take-back/recycling program?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Supports responsible end-of-life product disposal'
    },
    {
      id: 'default_ethical',
      question: 'Is this product ethically sourced with transparent supply chain practices?',
      type: 'boolean',
      choices: ['Yes', 'No'],
      description: 'Ensures responsible sourcing and fair trade practices'
    },
    {
      id: 'default_materials',
      question: 'What are the primary materials and components used in this product?',
      type: 'text',
      placeholder: 'e.g., Stainless steel frame, Bamboo handle, Silicone grip',
      description: 'Helps consumers understand product composition and quality'
    },
    {
      id: 'default_durability',
      question: 'What is the expected product lifespan and durability rating?',
      type: 'select',
      choices: ['Light Use (1-2 years)', 'Moderate Use (3-5 years)', 'Heavy Use (5-10 years)', 'Professional Grade (10+ years)', 'Lifetime Durability'],
      description: 'Helps consumers assess long-term value and quality'
    },
    {
      id: 'default_sustainability',
      question: 'What sustainability initiatives or environmental certifications does this product have?',
      type: 'text',
      placeholder: 'e.g., Carbon-neutral shipping, B-Corp certified, 1% for the Planet member',
      description: 'Demonstrates commitment to environmental responsibility'
    },
    {
      id: 'default_warranty',
      question: 'What warranty or guarantee is provided with this product?',
      type: 'text',
      placeholder: 'e.g., 30-day satisfaction guarantee, 2-year limited warranty',
      description: 'Provides consumer protection and quality assurance'
    }
  ]
};

/**
 * Generate contextual questions based on product type
 * 
 * @param {string} productType - The type of product (Food, Cosmetic, Electronics, Clothing, etc.)
 * @returns {Array} Array of question objects
 */
export function generateQuestions(productType) {
  // Normalize product type
  const normalizedType = productType.charAt(0).toUpperCase() + productType.slice(1).toLowerCase();
  
  // Get questions for the specific product type, or use default questions
  const questions = questionDatabase[normalizedType] || questionDatabase.Other;
  
  // Add metadata about AI generation
  const metadata = {
    generatedAt: new Date().toISOString(),
    productType: normalizedType,
    questionCount: questions.length,
    aiModel: 'Rule-based simulation (v1.0)',
    note: 'In production, this would use GPT-4, Gemini, or custom ML models'
  };
  
  return {
    questions,
    metadata
  };
}

/**
 * Advanced feature: Generate questions based on previous answers
 * This simulates an AI that asks follow-up questions based on context
 * 
 * @param {string} productType - The type of product
 * @param {Object} previousAnswers - Answers to previous questions
 * @returns {Array} Array of follow-up question objects
 */
export function generateFollowUpQuestions(productType, previousAnswers) {
  const followUps = [];
  
  // Example: If user said product contains preservatives, ask which ones
  if (previousAnswers.food_preservatives === 'Yes') {
    followUps.push({
      id: 'food_preservative_types',
      question: 'Which preservatives does it contain?',
      type: 'text',
      placeholder: 'e.g., Sodium benzoate, Potassium sorbate...'
    });
  }
  
  // Example: If not cruelty-free, ask about animal testing
  if (previousAnswers.cosmetic_cruelty_free === 'No') {
    followUps.push({
      id: 'cosmetic_testing_details',
      question: 'What type of animal testing was conducted?',
      type: 'text',
      placeholder: 'Please provide details...'
    });
  }
  
  // Example: If contains batteries, ask about type
  if (previousAnswers.electronics_battery === 'Yes') {
    followUps.push({
      id: 'electronics_battery_type',
      question: 'What type of battery does it use?',
      type: 'select',
      choices: ['Lithium-ion', 'Alkaline', 'Rechargeable', 'Solar', 'Other']
    });
  }
  
  return followUps;
}

/**
 * Get all available product types
 * @returns {Array} Array of product type names
 */
export function getAvailableProductTypes() {
  return Object.keys(questionDatabase).filter(type => type !== 'Default');
}
