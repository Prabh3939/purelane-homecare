export const products = [
  { id: 'p1', name: 'Dishwash Liquid', price: 299, originalPrice: 349, rating: 4.8, reviewsCount: 120, badge: 'Popular', icon: '🧼' },
  { id: 'p2', name: 'Laundry Cleaner', price: 499, originalPrice: 599, rating: 4.9, reviewsCount: 88, badge: 'Eco-Choice', icon: '🧺' },
  { id: 'p3', name: 'Floor Cleaner', price: 399, originalPrice: 449, rating: 4.7, reviewsCount: 204, badge: 'Best Value', icon: '🪣' },
  { id: 'p4', name: 'Handwash Wash', price: 199, originalPrice: 249, rating: 4.9, reviewsCount: 310, badge: 'Gentle', icon: '🧴' }
];

export const combos = [
  { id: 'c1', name: 'Complete Homecare Set', price: 1199, originalPrice: 1646, discount: 'Save 27%', items: ['Dishwash', 'Laundry', 'Floor', 'Handwash'], icon: '✨' },
  { id: 'c2', name: 'Kitchen Essentials', price: 449, originalPrice: 598, discount: 'Save 25%', items: ['Dishwash', 'Handwash'], icon: '🍽️' }
];

export const bundleCategories = [
  {
    category: 'Small Household (1-2 people)',
    id: 'small',
    bundles: [
      { id: 'b1', name: 'Starter Duo', qty: '2 Pack', price: 649, originalPrice: 798, features: ['Free Shipping', 'Plant-based safe', 'Standard caps'] },
      { id: 'b2', name: 'Quarterly Essentials', qty: '4 Pack', price: 1199, originalPrice: 1496, best: true, features: ['Free Shipping', '1 Dispenser cap included', 'Save 20%'] }
    ]
  },
  {
    category: 'Family Care (3-5 people)',
    id: 'family',
    bundles: [
      { id: 'b3', name: 'Family Saver', qty: '6 Pack', price: 1599, originalPrice: 2094, best: true, features: ['Free Shipping', '2 Auto-dispenser caps', 'Priority delivery'] },
      { id: 'b4', name: 'Bimonthly Bulk', qty: '8 Pack', price: 2099, originalPrice: 2792, features: ['Free Shipping', '2 Dispenser caps', 'Save 25%'] }
    ]
  },
  {
    category: 'Annual & Eco Power User',
    id: 'annual',
    bundles: [
      { id: 'b5', name: 'Annual Supply', qty: '12 Pack', price: 2999, originalPrice: 4188, best: true, features: ['Free Shipping', '4 Dispenser caps', 'Zero waste packaging focus'] }
    ]
  }
];

export const whyBundlesFeatures = [
  { icon: '💰', title: 'Up to 30% Savings', text: 'Bundled pricing significantly lowers the cost per bottle compared to standalone items.' },
  { icon: '🌱', title: 'Lower Carbon Footprint', text: 'Consolidated shipping reduces transport emissions and packaging waste.' },
  { icon: '📦', title: 'Never Run Out', text: 'Stock up for months at a time without constant last-minute reordering.' }
];

export const reviews = [
  { id: 'r1', author: 'Ananya S.', text: 'Loved the fresh botanical scent and how gentle it is on my hands.', rating: 5, role: 'Verified Buyer' },
  { id: 'r2', author: 'Rohan M.', text: 'The combos are amazing value. Zero harsh chemical residue on dishes.', rating: 5, role: 'Verified Buyer' },
  { id: 'r3', author: 'Priya K.', text: 'Fast delivery across India and superb natural cleaning power!', rating: 5, role: 'Verified Buyer' }
];