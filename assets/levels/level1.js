const level1 = new Level(
    [                                                           
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new Chicken(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        // new ChickenSmall(),
        new Endboss(),
    ],
    [                                                            
        new Cloud(),
        new Cloud(), 
        new Cloud(),
        new Cloud(), 
        new Cloud(), 
    ],
    [   // Create an array of background objects, each representing a layer of the background
        new BackgroundObject('./assets/img/5_background/layers/air.png', -719),                 // insert image at x-coordinate -719
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719),     // insert image at x-coordinate -719
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719),    // insert image at x-coordinate -719
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719),     // insert image at x-coordinate -719

        new BackgroundObject('./assets/img/5_background/layers/air.png', 0),                    // insert image at x-coordinate 0
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),        // insert image at x-coordinate 0
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),       // insert image at x-coordinate 0
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),        // insert image at x-coordinate 0
        new BackgroundObject('./assets/img/5_background/layers/air.png', 719),                  // insert image at x-coordinate 719
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719),      // insert image at x-coordinate 719
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719),     // insert image at x-coordinate 719
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719),      // insert image at x-coordinate 719

        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2),              // insert image at x-coordinate 0
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),  // insert image at x-coordinate 719 * 2
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2), // insert image at x-coordinate 719 * 2
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),  // insert image at x-coordinate 719 * 2
        new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3),              // insert image at x-coordinate 719
        new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),  // insert image at x-coordinate 719 * 3
        new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3), // insert image at x-coordinate 719 * 3
        new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),  // insert image at x-coordinate 719 * 3
    ],

    [
        new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
        new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
    ],

    [
        // new Coin('./assets/img/8_coin/coin_1.png'),
        // new Coin('./assets/img/8_coin/coin_2.png'),
        // new Coin('./assets/img/8_coin/coin_1.png'),
        // new Coin('./assets/img/8_coin/coin_2.png'),
        // new Coin('./assets/img/8_coin/coin_1.png'),
    ]
);