let level1;
function initLevel() {

    level1 = new Level(
        [
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
        ],
        
        [
            new Cloud('./assets/img/5_background/layers/4_clouds/1.png', -300, 280),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 300, 320),
            new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 900, 300),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 1500, 320),
            new Cloud('./assets/img/5_background/layers/4_clouds/1.png', 2100, 280),
            new Cloud('./assets/img/5_background/layers/4_clouds/2.png', 2700, 300),
        ],

        [   
            new BackgroundObject('./assets/img/5_background/layers/air.png', -719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', -719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', -719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', -719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/air.png', -719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719 * 3),

            new BackgroundObject('./assets/img/5_background/layers/air.png', -719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', -719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', -719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', -719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/air.png', -719),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 719),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundObject('./assets/img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('./assets/img/5_background/layers/1_first_layer/1.png', 719 * 4),
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
            new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
            new Bottle('./assets/img/6_salsa_bottle/1_salsa_bottle_on_ground.png'),
            new Bottle('./assets/img/6_salsa_bottle/2_salsa_bottle_on_ground.png'),
        ],

        [
            new Coin('./assets/img/8_coin/coin_1.png'),
            new Coin('./assets/img/8_coin/coin_2.png'),
            new Coin('./assets/img/8_coin/coin_1.png'),
            new Coin('./assets/img/8_coin/coin_2.png'),
            new Coin('./assets/img/8_coin/coin_1.png'),
            new Coin('./assets/img/8_coin/coin_1.png'),
            new Coin('./assets/img/8_coin/coin_2.png'),
            new Coin('./assets/img/8_coin/coin_1.png'),
            new Coin('./assets/img/8_coin/coin_2.png'),
            new Coin('./assets/img/8_coin/coin_1.png'),
        ]
    );
}