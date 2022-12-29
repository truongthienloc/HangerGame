import Phaser from "phaser";

import * as config from "../configs/configMap01";

export default class IntroScene extends Phaser.Scene
{
    private player?: Phaser.Physics.Arcade.Sprite;
    private cursors?: Phaser.Types.Input.Keyboard.CursorKeys;

    constructor() 
    {
        super("intro");
    }

    init(): void 
    {
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    create(): void 
    {
        // TODO: Create map & scale map
        const map = this.make.tilemap({ key: "Map01_House" });
        map.setBaseTileSize(config.TILE_WIDTH_GAME, config.TILE_WIDTH_GAME);

        // TODO: Create tiles
        const tileHousePlatformer = map.addTilesetImage("House-tileset", "house_platformer");
        const tileBedroom = map.addTilesetImage("House-bedroom", "house_bedroom");
        const tileLivingroom = map.addTilesetImage("House-living room", "house_livingroom");

        // TODO: Create layers & scale layer
        const TINT_BEDROOM = 0xffaaff;
        const TINT_LIVINGROOM = 0x00aaff;

        map.createLayer("background_bedroom", tileHousePlatformer)
            .setCollisionByProperty({ collides: true })
            .forEachTile(tile => {
                tile.tint = TINT_BEDROOM;
            });

        map.createLayer("background_livingroom", tileHousePlatformer)
            .setCollisionByProperty({ collides: true })
            .forEachTile(tile => {
                tile.tint = TINT_LIVINGROOM;
            });
        
        const platform = map.createLayer("platform", [
            tileHousePlatformer, tileBedroom, tileLivingroom
        ]).setCollisionByProperty({ collides: true });

        map.setLayerTileSize(config.TILE_WIDTH_GAME, config.TILE_WIDTH_GAME, "platform");
        map.setLayerTileSize(config.TILE_WIDTH_GAME, config.TILE_WIDTH_GAME, "background_bedroom");
        map.setLayerTileSize(
            config.TILE_WIDTH_GAME, config.TILE_WIDTH_GAME, "background_livingroom"
        );

        // TODO: Get object
        const objects = map.getObjectLayer("objects");
        const obj = objects.objects[0];
        const { x: mx = 0, y: my = 0 } = obj;
        
        const x = mx * config.mulPx;
        const y = my * config.mulPx;
        //console.log(x, y);
        this.player = this.physics.add.sprite(x, y, "Han")
            .setScale(config.SCALE_CHAR);
        
        this.physics.add.collider(platform, this.player);

        // TODO: Change background color
        this.cameras.main.setBackgroundColor(0xd8d8d8);
        this.cameras.main.startFollow(this.player);
        
    }

    update(time: number, delta: number): void 
    {
        // if(this.cursors?.left.isDown)
        //     this.cameras.main.setPosition(this.cameras.main.x - 20, this.cameras.main.y);
    }
}