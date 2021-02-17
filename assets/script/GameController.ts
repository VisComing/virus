// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';


    isGameStart : boolean = false
    touchStartPos : cc.Vec2 = null
    plantStartPos : cc.Vec2 = null
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.node.on('touchstart', this.onTouchStart, this)
    }

    gameStart () {
        //游戏开始，移出
        let controller = this.node.getComponent('MainSceneController')
        if(!controller) {
            cc.error('GameController.ts null comp')
        }
        else {
            controller.moveOut()
        }
        //飞机缩小
        let plane : cc.Node = cc.find('Canvas/AirPlane')
        plane.runAction(cc.scaleTo(0.6, 0.8))

        

        this.node.on('touchmove', this.onTouchMove, this)
        this.node.on('touchend', this.onTouchEnd, this)
    }

    onTouchStart (event : cc.Event.EventTouch) {
        let pos = this.node.convertToNodeSpaceAR(event.getLocation())
        if(!this.isGameStart) {
            if(pos.x < 600 && pos.x > -600 && pos.y < 120 && pos.y > -745) {
                //发生在触摸区域
                //开始游戏
                this.isGameStart = true
                this.gameStart()
                this.touchStartPos = pos
            }
        }
        else {
            //游戏已经开始了
            this.touchStartPos = pos            
        }

        //显示枪口
        let fashekou = cc.find('Canvas/AirPlane/fashekou')
        if(!fashekou) {
            cc.error('GameController.ts, 发射口没找到')
        }
        else {
            let _fashekou = fashekou.getComponent('fashekou')
            _fashekou.beginFire()
        }
        
        let plane : cc.Node = cc.find('Canvas/AirPlane')
        if(!plane) {
            cc.error('GameController.ts, plane null')
        } 
        else {
            this.plantStartPos = plane.getPosition()
        }
    }
    onTouchMove (event : cc.Event.EventTouch) {
        let touchPos = this.node.convertToNodeSpaceAR(event.getLocation())
        let plane : cc.Node = cc.find('Canvas/AirPlane')
        if(!plane) {
            cc.error('GameController.ts, plane null')
        } 
        else {
            let posX : number = this.plantStartPos.x + touchPos.x - this.touchStartPos.x
            let posY : number = this.plantStartPos.y + touchPos.y - this.touchStartPos.y
            if(posX > 540) posX = 540
            else if(posX < -540) posX = -540
            if(posY > 960) posY = 960
            else if(posY < -960) posY = -960 
            plane.setPosition(posX, posY)
        }
    }

    onTouchEnd () {
        //隐藏枪口
        let fashekou = cc.find('Canvas/AirPlane/fashekou')
        if(!fashekou) {
            cc.error('GameController.ts, 发射口没找到')
        }
        else {
            let _fashekou = fashekou.getComponent('fashekou')
            _fashekou.stopFire()
        }

        //变黑，病毒移速变慢

    }
    // update (dt) {}
}
