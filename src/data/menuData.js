// src/data/menuData.js

export const MenuData = [
    // === STARTERS & APPETIZERS ===
    { 
        id: 1,
        name: 'Hot Ginger Tea', 
        category: 'BreakFast & Appetizers',
        desc: 'Crispy wedges seasoned with our signature spice blend.', 
        price: 1500, 
        tag: 'NEW', 
        image: '/gallery/hot-tea.png', // Ensure these filenames exist in your public/gallery folder
        isToGo: true, 
        stock: 20 // Limited stock for to-go orders
    },
    { 
        id: 2,
        name: 'Coffee Tea', 
        category: 'BreakFast & Appetizers',
        desc: 'Hand-rolled crispy pastry filled with fresh garden vegetables.', 
        price: 1700, 
        tag: 'POPULAR', 
        image: '/gallery/black-coffee.png',
        isToGo: true,
        stock: 15 
    },
    { 
        id: 3,
        name: 'Garlic Bread with Cheese', 
        category: 'BreakFast & Appetizers',
        desc: 'Toasted baguette topped with roasted garlic and melted mozzarella.', 
        price: 1500, 
        tag: 'NEW', 
        image: '/gallery/pasta-plating.png',
        isToGo: true,
        stock: 25 
    },
    { 
        id: 4,
        name: 'Palitable Spaghetti', 
        category: 'BreakFast & Appetizers',
        desc: 'Fresh cucumbers, olives, and premium feta with oregano vinaigrette.', 
        price: 1000, 
        tag: 'TRENDING', 
        image: '/gallery/toastedbread-tea.png',
        isToGo: false, 
        stock: 10
    },
    { 
        id: 5,
        name: 'Toasted Bread and Tea', 
        category: 'BreakFast & Appetizers',
        desc: 'Golden fried cheese sticks served with zesty marinara sauce.', 
        price: 2500, 
        tag: "CHEF'S SPECIAL", 
        image: '/gallery/delicious-burger.png',
        isToGo: true,
        stock: 30 
    },

    // === MAIN COURSE ===
    { 
        id: 6,
        name: 'Hamburgar', 
        category: 'Day Dishes',
        desc: 'Fresh zucchini spirals tossed in a vibrant basil-pine nut pesto.', 
        price: 1500, 
        tag: "CHEF'S SPECIAL", 
        image: '/gallery/rice sauce.png',
        isToGo: true,
        stock: 20 
    },
    { 
        id: 7,
        name: 'Rice Chicken saurce', 
        category: 'Day Dishes',
        desc: 'Stone-baked pizza with premium pepperoni and herb-infused sauce.', 
        price: 1500, 
        tag: 'TRENDING', 
        image: '/gallery/ripeplantain-ndolle.png',
        isToGo: true,
        stock: 15 
    },
    { 
        id: 8,
        name: 'Ndolle & Ripe Plantain', 
        category: 'Day Dishes',
        desc: 'Fresh tomato, basil, and buffalo mozzarella on a crispy crust.', 
        price: 2000, 
        tag: 'NEW', 
        image: '/gallery/eru-apark.png',
        isToGo: true,
        stock: 10 
    },
    { 
        id: 9,
        name: 'Waterfufu & Eru', 
        category: 'Day Dishes',
        desc: 'Soft corn tortillas filled with citrus-marinated protein and salsa.', 
        price: 2500, 
        tag: 'POPULAR', 
        image: '/gallery/achu-spark.png',
        isToGo: true,
        stock: 25 
    },
    { 
        id: 10,
        name: 'Udon Noodles', 
        category: 'Day Dishes',
        desc: 'Thick wheat noodles in a savory broth with seasonal greens.', 
        price: 1500, 
        tag: 'MUST TRY', 
        image: '/gallery/spaghetti-spark.png',
        isToGo: false, // 
        stock: 15
    },

    // === DESSERTS ===
    { 
        id: 11,
        name: 'Freekers Table', 
        category: 'Desserts & Parties',
        desc: 'Rich dark chocolate mousse with a hint of sea salt.', 
        price: 35000, 
        tag: 'NEW', 
        image: '/gallery/party-table.png',
        isToGo: true,
        stock: 20 
    },
    { 
        id: 12,
        name: 'Desert Rose Table', 
        category: 'Desserts & Parties',
        desc: 'Light sponge cake infused with rosewater and cream.', 
        price: 50000, 
        tag: 'POPULAR', 
        image: '/gallery/local ingredient.png',
        isToGo: true,
        stock: 15 
    },
    { 
        id: 13,
        name: 'Dessert Breeze', 
        category: 'Desserts & Parties',
        desc: 'A refreshing lemon-zest cake with a light glaze.', 
        price: 50000, 
        tag: 'NEW', 
        image: '/gallery/full-table-party-dishes.png',
        isToGo: true,
        stock: 25 
    },
    { 
        id: 14,
        name: 'Golden Oasis', 
        category: 'Desserts & Parties',
        desc: 'Honey-infused cake layered with toasted nuts.', 
        price: 50000, 
        tag: 'POPULAR', 
        image: '/gallery/jlove-spark.png',
        isToGo: true,
        stock: 10 
    },



    // === Juice & Drinks ===
    { 
        id: 15,
        name: '........Guinness...............', 
        category: 'Drinks & Cocktail',
        desc: 'Fresh zucchini spirals tossed in a vibrant basil-pine nut pesto.', 
        price: 1500, 
        tag: "CHEF'S SPECIAL", 
        image: '/gallery/guinness.png',
        isToGo: true,
        stock: 5 
    },
    { 
        id: 16,
        name: '........Hieneken...............', 
        category: 'Drinks & Cocktail',
        desc: 'Stone-baked pizza with premium pepperoni and herb-infused sauce.', 
        price: 1500, 
        tag: 'TRENDING', 
        image: '/gallery/heeneken.png',
        isToGo: true,
        stock: 5 
    },
    { 
        id: 17,
        name: '........White Wine..............', 
        category: 'Drinks & Cocktail',
        desc: 'Fresh tomato, basil, and buffalo mozzarella on a crispy crust.', 
        price: 10000, 
        tag: 'NEW', 
        image: '/gallery/icewind-collection.png',
        isToGo: true,
        stock: 5 
    },
    { 
        id: 18,
        name: '........Red Wine................', 
        category: 'Drinks & Cocktail',
        desc: 'Soft corn tortillas filled with citrus-marinated protein and salsa.', 
        price: 8000, 
        tag: 'POPULAR', 
        image: '/gallery/redwine-collection.png',
        isToGo: true,
        stock: 5 
    },
    { 
        id: 19,
        name: '.........Soft Drink...............', 
        category: 'Drinks & Cocktail',
        desc: 'Thick wheat noodles in a savory broth with seasonal greens.', 
        price: 1500, 
        tag: 'MUST TRY', 
        image: '/gallery/softdrink-collection.png',
        isToGo: false, 
        stock: 5
    },
    


    // Natural Juices 
       { 
        id: 20,
        name: '........Mango Juice...........',
        category: 'Juice & Beverages',
        desc: 'Freshly squeezed mango juice with a hint of lime.', 
        price: 4000,    
        tag: 'POPULAR',
        image: '/juice/mango-juice.png',
        isToGo: true,
        stock: 5
    },,
    { 
        id: 21, 
        name: '........Pineapple Juice...........',
        category: 'Juice & Beverages',
        desc: 'Refreshing pineapple juice served chilled.', 
        price: 4000,
        tag: 'NEW',
        image: '/juice/pineapple-juice.png',
        isToGo: true,
        stock: 5
    },
    { 
        id: 22, 
        name: '........Orange Juice...........',    
        category: 'Juice & Beverages',
        desc: 'Classic orange juice made from ripe oranges.',
        price: 4000,
        tag: 'MUST TRY',
        image: '/juice/orange-juice.png',
        isToGo: true,
        stock: 5
    },
    {
        id: 23,
        name: '........Lemonade...........',
        category: 'Juice & Beverages',
        desc: 'Zesty lemonade with a perfect balance of sweet and tart.',   
        price: 3500,
        tag: 'TRENDING',
        image: '/juice/lemonade-juice.png',   
        isToGo: true,
        stock: 5
    },
    {
        id: 24,
        name: '........Watermelon Juice...........',
        category: 'Juice & Beverages',
        desc: 'Hydrating watermelon juice served over ice.',
        price: 4500,
        tag: 'NEW',
        image: '/juice/watermelon-juice.png',
        isToGo: true,
        stock: 5
    },
];