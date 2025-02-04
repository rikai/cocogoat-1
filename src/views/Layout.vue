<template>
    <header :class="$style.header">
        <div class="logo">
            <icon-cocogoat class="v-icon cocogoat" />
        </div>
    </header>
    <div :class="$style.userCorner">
        <user-selector />
    </div>
    <aside :class="$style.menu">
        <div class="logo">
            <icon-cocogoat class="v-icon cocogoat" />
        </div>
        <div class="nav">
            <router-link active-class="" exact-active-class="router-link-active" :to="{ name: 'home' }">
                <fa-icon :icon="showUncompatible ? ['fab', 'internet-explorer'] : 'house'" />
                <span class="txt">
                    首页
                    <span v-if="showUncompatible" :class="$style.uncompatibleWarning">
                        <fa-icon icon="triangle-exclamation" />
                    </span>
                </span>
            </router-link>
            <router-link :to="{ name: 'artifact.index' }">
                <icon-artifact class="v-icon artifact" />
                <span class="txt">圣遗物</span>
            </router-link>
            <router-link :to="{ name: 'achievement.index' }">
                <icon-achievement class="v-icon achievement" />
                <span class="txt">成就</span>
            </router-link>
            <router-link :class="!isMobile ? 'pc-user' : ''" :to="{ name: 'options.basic' }">
                <fa-icon icon="gear" />
                <span class="txt">设置</span>
            </router-link>
        </div>
    </aside>
    <router-view v-slot="{ Component }">
        <transition
            :name="isMobile ? transitionName : ''"
            :duration="isMobile ? 100 : -1"
            :mode="isMobile ? '' : 'out-in'"
        >
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<script>
import IconCocogoat from '@/components/Icons/cocogoat.vue'
import IconArtifact from '@/components/Icons/artifact.vue'
import IconAchievement from '@/components/Icons/achievement.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHouse, faGear, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'
import { faInternetExplorer } from '@fortawesome/free-brands-svg-icons'
library.add(faHouse, faGear, faTriangleExclamation, faInternetExplorer)

import UserSelector from '@/components/UserSelector.vue'

import bus from '@/bus'

export default {
    components: {
        IconCocogoat,
        IconArtifact,
        IconAchievement,
        UserSelector,
    },
    data() {
        return {
            transitionName: '',
            isMobile: false,
            pcUserShown: false,
            showUncompatible: false,
        }
    },
    computed: {
        current() {
            return this.$route.path.split('/')[2] || '/'
        },
        user() {
            return {}
        },
    },
    watch: {
        $route(to, from) {
            const navs = ['', 'artifact', 'achievement', 'options']
            let toDepth = navs.indexOf(to.path.split('/')[1])
            let fromDepth = navs.indexOf(from.path.split('/')[1])
            if (toDepth == fromDepth) {
                toDepth = to.path.split('/').length
                fromDepth = from.path.split('/').length
            }
            if (to.path[to.path.length - 1] == '/') toDepth--
            if (from.path[from.path.length - 1] == '/') fromDepth--
            if (toDepth == fromDepth) {
                if (to.params.id) toDepth++
                if (from.params.id) fromDepth++
            }
            if (toDepth == fromDepth) {
                toDepth = navs.indexOf(to.path.split('/')[2])
                fromDepth = navs.indexOf(from.path.split('/')[2])
            }
            if (toDepth == fromDepth) {
                this.transitionName = ''
            } else {
                this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
            }
        },
    },
    created() {
        document.body.classList.add('layout')
        this.$k = function () {
            this.isMobile = document.body.offsetWidth < 640
            bus().isMobile = this.isMobile
            if (this.isMobile) {
                document.body.classList.remove('pc')
                document.body.classList.add('m')
            } else {
                document.body.classList.remove('m')
                document.body.classList.add('pc')
            }
        }.bind(this)
        window.addEventListener('resize', this.$k)
        this.$k()
    },
    unmounted() {
        window.removeEventListener('resize', this.$k)
    },
    methods: {},
}
</script>
<style lang="scss" module>
$main: var(--c-theme-sub);
$front: rgba(255, 255, 255, 0.75);
$--color-primary: var(--c-theme);
.user-corner {
    position: fixed;
    top: 0;
    right: 0;
    width: 140px;
    height: 50px;
    z-index: 1000;
    background: var(--c-menu);
}
:global(.m) .user-corner {
    width: 50px;
}
.uncompatibleWarning {
    color: #fe6565;
    position: absolute !important;
    left: 50%;
    bottom: 15px;
    svg {
        width: 20px !important;
        height: 20px !important;
    }
}
:global(.pc) .menu {
    :global {
        .logo {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 50px;
            background: var(--c-theme);
            box-shadow: 2px 0 12px 0 rgb(0 0 0 / 10%);
            .cocogoat {
                width: 50px;
                margin: 0 auto;
                display: block;
                fill: #fff;
            }
        }
        user-select: none;
        box-shadow: 2px 0 12px 0 rgb(0 0 0 / 10%);
        position: fixed;
        z-index: 999;
        width: 80px;
        left: 0;
        top: 0;
        bottom: 0;
        background: $main;
        color: $front;
        font-family: genshin;
        svg {
            transition: fill 0.2s;
            fill: $front;
        }
        padding: 13px 10px;
        padding-top: 65px;
        box-sizing: border-box;
        .nav a {
            display: block;
            height: 60px;
            overflow: hidden;
            border-radius: 3px;
            box-sizing: border-box;
            text-align: center;
            color: $front;
            text-decoration: none;
            margin-bottom: 10px;
            padding: 10px 0;
            transition: all 0.2s;
            i {
                display: block;
                font-size: 25px;
            }
            span {
                font-size: 14px;
                padding-top: 4px;
                display: block;
                position: relative;
            }
            &.router-link-active {
                background: var(--c-menu-active);
                color: $main;
                svg {
                    fill: $main;
                }
            }
            &.pc-user {
                cursor: pointer;
                position: absolute;
                bottom: 5px;
                left: 10px;
                right: 10px;
                outline: 0;
            }
            .svg-inline--fa {
                height: 22px;
                margin-bottom: -2px;
            }
        }
        .v-icon {
            &.artifact {
                width: 45px;
                margin-bottom: -7px;
                margin-top: -10px;
            }
            &.achievement {
                width: 38px;
                margin-bottom: -8px;
                margin-top: -6px;
            }
        }
    }
}

:global(.pc.dark) {
    .menu :global(.nav a.router-link-active) {
        color: var(--c-theme);
        svg {
            fill: var(--c-theme);
        }
    }
}
.header {
    user-select: none;
    -webkit-app-region: drag;
    overflow: hidden;
    position: fixed;
    left: 0;
    padding-left: 100px;
    right: 0;
    top: 0;
    height: 50px;
    z-index: 990;
    background: var(--c-menu);
    border-bottom: 0;
    box-sizing: border-box;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
}
:global(.m) {
    .menu {
        position: fixed;
        bottom: 0;
        left: 0;
        right: 0;
        height: 55px;
        z-index: 999;
        background: var(--c-menu-active);
        font-family: genshin;
        :global {
            .logo {
                display: none;
            }
            .nav {
                display: flex;
                height: 100%;
                align-items: center;
                box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
                a {
                    transition: all 0.2s;
                    flex: 1;
                    text-align: center;
                    text-decoration: none;
                    color: #888;
                    -webkit-tap-highlight-color: transparent;
                    svg {
                        display: block;
                        font-size: 25px;
                        width: 25px;
                        margin: 0 auto;
                        &.v-icon.artifact {
                            width: 44px;
                            height: 37px;
                            margin-bottom: -4px;
                            margin-top: -7px;
                        }
                        &.v-icon.achievement {
                            width: 40px;
                            height: 30px;
                            margin-bottom: -3px;
                            margin-top: -1px;
                        }
                        fill: #888;
                    }
                    span {
                        font-size: 12px;
                        position: relative;
                    }
                    &.router-link-active {
                        color: var(--c-theme);
                        & > svg.v-icon {
                            fill: var(--c-theme);
                        }
                    }
                }
            }
        }
    }

    &:global(.dark) {
        .menu {
            background: var(--c-menu);
        }
    }
    .header {
        padding-left: 0;
        :global {
            .logo {
                width: 50px;
                height: 50px;
                line-height: 50px;
                padding-top: 6px;
                background: var(--c-theme);
                svg {
                    width: 40px;
                    height: 40px;
                    display: block;
                    margin: 0 auto;
                    fill: #fff;
                }
            }
        }
    }
}
:global {
    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all 0.1s linear;
        position: absolute;
        width: 100%;
        left: 0;
        z-index: 991;
    }
    .slide-right-enter-from {
        transform: translateX(-100%);
    }
    .slide-right-leave-active {
        transform: translateX(100%);
    }
    .slide-left-enter-from {
        transform: translateX(100%);
    }
    .slide-left-leave-active {
        transform: translateX(-100%);
    }
    .m .hidden-mobile {
        display: none;
    }
}
</style>
