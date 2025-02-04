<template>
    <Layout full-height style="background: var(--c-background)">
        <template #title>
            <div class="teleport-title">
                <span style="font-family: genshin">
                    成就
                    <small :class="$style.totalPercent">
                        <div class="count">{{ totalFin.count }} / {{ totalCount }}</div>
                        <div class="reward">
                            {{ totalFin.reward }} / {{ totalReward }}
                            <img src="@/assets/images/yuanshi.png" alt="原石" />
                        </div>
                    </small>
                </span>
            </div>
        </template>
        <template #actions>
            <div class="actions">
                <div class="a-line">
                    <el-popover
                        v-model:visible="showClear"
                        :width="190"
                        :placement="isMobile ? 'left-start' : 'bottom'"
                    >
                        <div style="text-align: center">真的要清空吗？</div>
                        <div style="text-align: center; margin: 0; margin-top: 15px">
                            <el-link style="margin-right: 15px" @click="showClear = false">取消</el-link>
                            <el-link type="danger" style="margin-right: 15px" @click="doClear(false)">清空当前</el-link>
                            <el-button size="small" type="danger" plain @click="doClear(true)">清空全部</el-button>
                        </div>
                        <template #reference>
                            <el-button v-show="!showScanner" type="danger" plain @click="showClear = true">
                                <fa-icon icon="trash-can" />
                                清空
                            </el-button>
                        </template>
                    </el-popover>
                </div>
                <div class="a-line">
                    <el-button v-show="!showScanner" class="import-button" @click="showImport = !showImport">
                        导入
                    </el-button>
                    <div v-show="!showScanner" class="dropdown">
                        <el-dropdown class="header-plain-dropdown" split-button @click="doExport('')">
                            导出
                            <template #dropdown>
                                <el-dropdown-menu class="el-dropdown-menu--small">
                                    <el-dropdown-item class="export-title" @click="doExport('cocogoat')">
                                        椰羊JSON
                                    </el-dropdown-item>
                                    <el-dropdown-item divided @click="doExport('snapgenshin')">
                                        Snap Genshin
                                    </el-dropdown-item>
                                    <el-dropdown-item @click="doExport('paimon')"> Paimon.moe </el-dropdown-item>
                                    <el-dropdown-item @click="doExport('seelie')"> Seelie.me </el-dropdown-item>
                                    <el-dropdown-item divided class="export-title" @click="doExport('excel')">
                                        Excel文件
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </template>
                        </el-dropdown>
                    </div>
                </div>
                <div class="a-line">
                    <el-button size="default" type="primary" :plain="!showScanner" @click="showScanner = !showScanner">
                        <fa-icon icon="crosshairs" /> {{ showScanner ? '退出' : '' }}识别
                    </el-button>
                </div>
            </div>
        </template>
        <div v-if="showScanner" :class="$style.scannerArea">
            <iframe ref="scannerFrame" class="scanner-frame" :src="frameSrc"></iframe>
            <div class="scanner-back">
                <div class="scanner-box">
                    <div class="scanner-title">成就识别</div>
                </div>
            </div>
        </div>
        <el-dialog
            v-model="exportData.show"
            :title="exportData.title"
            :custom-class="$style.exportDialog"
            destroy-on-close
        >
            <el-input type="textarea" :model-value="exportData.content"></el-input>
        </el-dialog>
        <el-dialog v-model="showImport" title="导入" :custom-class="$style.importDialog" destroy-on-close>
            <import-dialog :memo-id="autoImportId" @close="closeImport" />
        </el-dialog>
        <el-dialog
            v-model="scannerResult.show"
            :title="`成功扫描${scannerResult.length}个成就`"
            :custom-class="$style.scannerResultDialog"
            destroy-on-close
        >
            以下为失败和识别到的未完成成就列表，您可以自行检查确认后手动添加。
            <div class="faildResults">
                <div v-for="(image, index) in scannerResult.faildImages" :key="index">
                    <img :src="image.image" />
                    <div class="badge" :class="{ success: image.data.success }">
                        {{ image.data.success ? '未完' : '错误' }}
                    </div>
                </div>
            </div>
            <el-button class="feedback-btn" @click="sendOops"> 反馈失败记录 </el-button>
        </el-dialog>
        <achievement-detail :achievement="detail" @close="detail = undefined" />
        <section :class="$style.achievementView">
            <div class="progress">
                <div
                    class="progress-in"
                    :style="{
                        width:
                            ((achievementFinStat[currentCat.id || 0]?.count || 0) / currentCat.achievements.length) *
                                100 +
                            '%',
                    }"
                ></div>
            </div>
            <achievement-sidebar :achievementCat="achievementCat" :achievementFinStat="achievementFinStat" />
            <article>
                <DynamicScroller
                    :items="currentAch"
                    :min-item-size="80"
                    :custom-scrollbar="CustomElScrollVue"
                    class="scroller"
                >
                    <template #before>
                        <div class="page-before">
                            <div class="left">
                                <el-select
                                    v-model="statusVersion"
                                    class="status-version"
                                    multiple
                                    collapse-tags
                                    collapse-tags-tooltip
                                    placeholder="所有版本"
                                >
                                    <el-option
                                        v-for="i in allVersions"
                                        :key="i"
                                        :value="i"
                                        :label="i.toFixed(1)"
                                    ></el-option>
                                </el-select>
                                <el-select
                                    v-model="statusQuest"
                                    multiple
                                    collapse-tags
                                    collapse-tags-tooltip
                                    class="status-quest"
                                    placeholder="所有类型"
                                >
                                    <el-option value="WQ" label="世界任务"></el-option>
                                    <el-option value="IQ" label="每日委托"></el-option>
                                    <el-option value="MQ" label="主线任务"></el-option>
                                </el-select>
                                <div class="chk">
                                    <el-checkbox v-model="sortByStatus" label="未完成优先" size="large" />
                                </div>
                            </div>
                            <div class="right">
                                <el-input v-model="search" class="search-box" placeholder="搜索成就名字、描述或ID">
                                    <template #suffix>
                                        <span class="fa-icon">
                                            <fa-icon icon="search" />
                                        </span>
                                    </template>
                                </el-input>
                            </div>
                        </div>
                    </template>
                    <template v-slot="{ item: i, active }">
                        <DynamicScrollerItem :item="i" :active="active" :size-dependencies="[i.preStage, i.postStage]">
                            <achievement-item
                                :i="i"
                                :fin="achievementFin[i.id]"
                                :preFin="achievementFin[i.preStage]"
                                :contributed="contributed"
                                @check="updateFinished(i.id)"
                                @input-date="achievementFin[i.id].date = $event"
                                @input-status="achievementFin[i.id].status = $event"
                                @click-title="detail = i"
                            />
                        </DynamicScrollerItem>
                    </template>
                    <template #after>
                        <div class="page-after">
                            <div class="select-this-page">
                                <el-link
                                    v-if="
                                        !achievementFinStat[currentCat.id] ||
                                        achievementFinStat[currentCat.id]?.count < currentCat.achievements.length
                                    "
                                    type="primary"
                                    @click="selectCat(currentCat)"
                                >
                                    全选本页
                                </el-link>
                            </div>
                            <el-divider>
                                <icon-cocogoat />
                            </el-divider>
                        </div>
                    </template>
                </DynamicScroller>
            </article>
        </section>
    </Layout>
</template>

<script lang="ts">
import '@/styles/actions.scss'
import { useRoute, useRouter } from 'vue-router'
import { ref, toRef, defineComponent, computed, watch, onMounted } from 'vue'
import achevementsAmos from '@/plugins/amos/achievements/index'

import {
    faCrosshairs,
    faArrowUpFromBracket,
    faCheck,
    faTrashCan,
    faEllipsis,
    faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
library.add(faCrosshairs, faArrowUpFromBracket, faCheck, faTrashCan, faEllipsis, faSearch)
import IconCocogoat from '@/components/Icons/cocogoat.vue'

import { i18n } from '@/i18n'
import { store } from '@/store'
import { Achievement, AchievementCategory, IAchievementStore } from '@/typings/Achievement'
import type { IAScannerData } from '../AchievementScanner/scanner/scanner'
import dayjs from 'dayjs'

import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import CustomElScrollVue from '@/components/ElCustomScroll.vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller/src/index'

import { useScannerFrame } from './scannerFrame'
import { useExportAchievements } from './useExport'
import { useContributedAchievements } from './useContributedAchievements'

import AchievementItem from './AchivementItem.vue'
import AchievementSidebar from './AchievementSidebar.vue'
import AchievementDetail from './AchievementDetail.vue'
import ImportDialog from './ImportDialog.vue'
import versionMap, { allVersions } from './versionMap'
import { uniqBy, cloneDeep } from 'lodash-es'
import bus from '@/bus'
import { getUrl } from '@/router'
import { runMigrate } from './runMigrate'

export default defineComponent({
    name: 'ArtifactIndex',
    components: {
        IconCocogoat,
        AchievementItem,
        AchievementSidebar,
        AchievementDetail,
        ImportDialog,
        DynamicScroller,
        DynamicScrollerItem,
    },
    setup() {
        const selectedIds = ref<string[]>([])
        const showScanner = ref(false)
        const search = ref('')
        const frameSrc = getUrl('frames.achievement.scan')
        const achievementFin = ref({} as Record<number, IAchievementStore>)
        const achievementFinStat = ref(
            {} as Record<
                number,
                {
                    count: number
                    reward: number
                }
            >,
        )
        const sortByStatus = ref(true)
        const totalCount = ref(0)
        const totalFin = ref({ count: 0, reward: 0 } as {
            count: number
            reward: number
        })
        const achievementCat = computed(() => {
            const ach = achevementsAmos.concat([]).sort((a, b) => a.order - b.order)
            return ach
        })
        const totalReward = computed(() => {
            return achievementCat.value.reduce((acc, cur) => {
                return acc + cur.totalReward
            }, 0)
        })
        const calcFin = () => {
            const newCount = {} as Record<
                number,
                {
                    count: number
                    reward: number
                }
            >
            const newFin = {} as Record<number, IAchievementStore>
            let totalFin_ = { count: 0, reward: 0 } as {
                count: number
                reward: number
            }
            let hasMigrated = 0
            const migratedRes = store.value.achievements.map((ach) => {
                const e = cloneDeep(ach)
                e.categoryId = e.categoryId || 0
                ach.categoryId = ach.categoryId || 0
                hasMigrated += runMigrate(e) ? 1 : 0
                if (e.id) {
                    newCount[e.categoryId] = newCount[e.categoryId] || {
                        count: 0,
                        reward: 0,
                    }
                    const currentReward =
                        achievementCat.value.find((k) => k.id === e.categoryId)?.achievements.find((k) => k.id === e.id)
                            ?.reward || 0
                    newCount[e.categoryId].count++
                    newCount[e.categoryId].reward += currentReward
                    totalFin_.count++
                    totalFin_.reward += currentReward
                }
                return e
            })
            if (hasMigrated > 0) {
                store.value.achievements = migratedRes
                console.log(hasMigrated + ' migrate task finished')
            }
            store.value.achievements.forEach((e) => {
                if (e.id) newFin[e.id] = e
            })
            achievementFinStat.value = newCount
            achievementFin.value = newFin
            totalCount.value = totalCount.value || achevementsAmos.reduce((a, b) => a + b.achievements.length, 0)
            totalFin.value = totalFin_
        }
        watch(store, calcFin, { deep: true, immediate: true })
        const route = useRoute()
        const currentCatId = computed(() => {
            return route.params.cat || 'wonders_of_the_world'
        })
        const currentCat = computed(() => {
            const v = achievementCat.value.find((i) => i.key === currentCatId.value) || achievementCat.value[0]
            const q = {} as Record<number, string>
            v.achievements.forEach((e) => {
                if (e.trigger.task && e.trigger.task.length > 0) {
                    q[e.id] = e.trigger.task[0].type
                }
            })
            return {
                ...v,
                quest: q,
            }
        })
        const statusVersion = ref([] as number[])
        const statusQuest = ref([] as string[])
        const currentAch = computed(() => {
            let data = currentCat.value.achievements.concat([])
            const statusQuest2 = statusQuest.value.map((e) => (e === 'MQ' ? '' : e))
            if (statusQuest2.length > 0) {
                data = data.filter((i) => statusQuest2.includes(currentCat.value.quest[i.id]))
            }
            if (statusVersion.value.length > 0) {
                data = data.filter((i) => statusVersion.value.includes(versionMap[i.id]))
            }
            if (sortByStatus.value)
                data = data.sort((a, b) => {
                    let ret = 0
                    let fa = achievementFin.value[a.id]
                    let fb = achievementFin.value[b.id]
                    if (a.postStage) {
                        let p = a
                        while (p.postStage) {
                            const q = currentCat.value.achievements.find((e) => e.id === p.postStage)
                            p = q || p
                            if (!q) {
                                console.log('DATAERR: ', p.postStage)
                                break
                            }
                        }
                        fa = achievementFin.value[p.id]
                    }
                    if (b.postStage) {
                        let p = b
                        while (p.postStage) {
                            const q = currentCat.value.achievements.find((e) => e.id === p.postStage)
                            p = q || p
                            if (!q) {
                                console.log('DATAERR: ', p.postStage)
                                break
                            }
                        }
                        fb = achievementFin.value[p.id]
                    }
                    if (a.preStage === b.id) return 1
                    if (fa && !fb) return 1
                    if (!fa && fb) return -1
                    return ret
                })
            if (search.value.trim()) {
                const has = (ach: Achievement, search: string) => {
                    if (ach.id.toString().includes(search)) return true
                    if (i18n.amos[ach.name].toLowerCase().includes(search.toLowerCase())) return true
                    if (i18n.amos[ach.desc].toLowerCase().includes(search.toLowerCase())) return true
                }
                data = data.filter((e) => {
                    const hasThis = has(e, search.value)
                    let hasPre = false
                    let k = e
                    while (k.preStage) {
                        const q = currentCat.value.achievements.find((i) => i.id === k.preStage)
                        if (!q) {
                            console.log('DATAERR: ', k.preStage)
                            break
                        }
                        k = q || k
                        if (has(k, search.value)) {
                            hasPre = true
                            break
                        }
                    }
                    let hasPost = false
                    k = e
                    while (k.postStage) {
                        const q = currentCat.value.achievements.find((i) => i.id === k.postStage)
                        if (!q) {
                            console.log('DATAERR: ', k.preStage)
                            break
                        }
                        k = q || k
                        if (has(k, search.value)) {
                            hasPost = true
                            break
                        }
                    }
                    return hasThis || hasPre || hasPost
                })
            }
            return data
        })
        const updateFinished = (id: number) => {
            if (achievementFin.value[id]) {
                const ids = [id]
                let ach: Achievement | undefined
                while ((ach = currentAch.value.find((e) => e.id === ids[0])) && ach.postStage) {
                    ids.unshift(ach.postStage)
                }
                store.value.achievements = store.value.achievements.filter((i) => !ids.includes(i.id))
                return
            }
            const finishedData = {
                id,
                status: '手动勾选',
                categoryId: currentCat.value.id,
                date: dayjs().format('YYYY/MM/DD'),
            } as IAchievementStore
            store.value.achievements.push(finishedData)
        }
        const showClear = ref(false)
        const doClear = async (all: boolean) => {
            if (all) {
                store.value.achievements = []
            } else {
                store.value.achievements = store.value.achievements.filter((i) => i.categoryId !== currentCat.value.id)
            }
            showClear.value = false
        }
        const selectCat = (cat: AchievementCategory) => {
            cat.achievements.forEach((i) => {
                if (!achievementFin.value[i.id]) {
                    const finishedData = {
                        id: i.id,
                        status: '全选添加',
                        categoryId: cat.id,
                        date: dayjs().format('YYYY/MM/DD'),
                    } as IAchievementStore
                    store.value.achievements.push(finishedData)
                }
            })
        }
        const scannerFrame = ref<HTMLIFrameElement | null>(null)
        const scannerResult = ref({
            show: false,
            length: 0,
            faildImages: [] as { image: string; data: IAScannerData }[],
        })
        const { sendOops } = useScannerFrame({
            scannerFrame,
            results: scannerResult,
            achievementFin,
            showScanner,
        })
        const autoImportId = computed(() => (route.query.memo ? route.query.memo.toString() : ''))
        const showImport = ref(!!autoImportId.value)
        watch(autoImportId, (v) => {
            if (v) {
                showImport.value = true
            }
        })
        const router = useRouter()
        const closeImport = (id: string) => {
            showImport.value = false
            if (id && id === autoImportId.value) {
                router.replace({
                    ...route,
                    query: {
                        ...route.query,
                        memo: undefined,
                    },
                })
            }
        }
        onMounted(() => {
            // dedupe
            const dedupedResult = uniqBy(store.value.achievements, (e) => e.id)
            if (dedupedResult.length !== store.value.achievements.length) {
                console.log('deduped from ' + store.value.achievements.length + ' to ' + dedupedResult.length)
                store.value.achievements = dedupedResult
            }
        })
        const contributed = useContributedAchievements()
        const detail = ref(undefined as Achievement | undefined)
        return {
            store,
            search,
            showScanner,
            selectedIds,
            frameSrc,
            achievementCat,
            currentCatId,
            currentCat,
            achievementFin,
            achievementFinStat,
            currentAch,
            updateFinished,
            doClear,
            showClear,
            selectCat,
            scannerFrame,
            scannerResult,
            CustomElScrollVue,
            ...useExportAchievements(),
            showImport,
            sortByStatus,
            totalCount,
            totalFin,
            totalReward,
            contributed,
            isMobile: toRef(bus(), 'isMobile'),
            detail,
            statusQuest,
            statusVersion,
            allVersions,
            autoImportId,
            closeImport,
            sendOops,
        }
    },
})
</script>
<style lang="scss" module>
.total-percent {
    color: #999;
    font-size: 14px;
    padding-left: 5px;
    display: inline-block;
    line-height: 15px;
    vertical-align: middle;
    margin-top: -4px;
    :global {
        div {
            display: inline-block;
            height: 19px;
            box-sizing: border-box;
            vertical-align: middle;
            border-radius: 2px;
        }

        .count {
            border: 1px solid var(--c-theme);
            color: var(--c-theme);
            background: var(--c-white);
            margin-right: -3px;
            padding: 0 5px;
            padding-right: 7px;
            padding-top: 1px;
        }
        .reward {
            background: var(--c-theme);
            color: var(--c-white);
            padding: 2px 5px;
            font-size: 12px;
            img {
                width: 15px;
                height: 15px;
                float: left;
                padding-right: 3px;
            }
        }
    }
}
:global(.m) .total-percent {
    position: absolute;
    top: 20px;
    right: 55px;
}
.import-dialog {
    width: 500px !important;
    max-width: 90%;
}
.export-dialog {
    width: 500px !important;
    max-width: 90%;
    textarea {
        font-size: 12px;
        height: 350px;
        font-family: Consolas, monospace;
    }
}
.scanner-result-dialog {
    width: 600px !important;
    max-width: 90%;
    :global {
        .feedback-btn {
            position: absolute;
            top: 12px;
            right: 50px;
        }
        .faildResults {
            margin-top: 20px;
            width: 100%;
            height: 300px;
            border: 1px solid #ddd;
            padding: 10px;
            box-sizing: border-box;
            display: block;
            overflow-y: scroll;
            overflow-x: hidden;
            & > div {
                width: 100%;
                border: 1px solid #ddd;
                border-radius: 5px;
                display: block;
                margin-bottom: 5px;
                position: relative;
                overflow: hidden;
            }
            img {
                width: 100%;
                height: 100%;
                display: block;
            }
            .badge {
                position: absolute;
                top: 0;
                left: 0;
                font-size: 12px;
                padding: 3px 5px;
                border: aliceblue;
                background: #fe6565;
                color: #fff;
                border-bottom-right-radius: 5px;
            }
            .badge.success {
                background: var(--c-theme);
                color: var(--c-white);
            }
        }
    }
}
.achievement-view {
    position: relative;
    min-height: 100%;
    :global {
        .progress {
            height: 3px;
            position: absolute;
            top: 0;
            left: 235px;
            right: 0;
            z-index: 99;
            .progress-in {
                height: 100%;
                background: var(--c-theme);
                transition: all 0.3s;
            }
        }
        article {
            left: 235px;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            .page-before {
                display: flex;
                padding-top: 15px;
                .right {
                    flex-grow: 1;
                }

                .left {
                    display: flex;
                    flex: 4;
                    .chk {
                        padding: 0 15px;
                        height: 32px;
                        .el-checkbox {
                            height: 32px;
                        }
                    }
                    .el-select {
                        min-width: 130px;
                        width: 140px;
                        max-width: 150px;
                        &.status-version {
                            min-width: 110px;
                            width: 130px;
                            max-width: 140px;
                            flex: 2;
                        }
                        flex: 3;
                        .el-tag.is-closable {
                            padding-left: 5px;
                        }
                        .el-tag__close {
                            display: none;
                        }
                    }
                    .status-switch {
                        width: 130px;
                        box-sizing: border-box;
                        flex: 1;
                    }
                    .el-select .el-select__tags > span {
                        display: flex !important;
                        width: 100%;
                        padding-left: 3px;
                    }
                    span.el-select__tags-text {
                        max-width: 100% !important;
                    }
                }

                .search-box {
                    width: 100%;
                }
            }
            .page-after {
                .select-this-page {
                    margin: 0 auto;
                    margin-top: 10px;
                    margin-bottom: -10px;
                    text-align: center;
                }
                .el-divider {
                    border-color: #ccc;
                    :global(.dark) & {
                        border-color: #333;
                    }
                    margin: 40px 0;
                    .el-divider__text {
                        background: var(--c-background);
                    }
                    svg {
                        fill: #aaa;
                        width: 50px;
                        height: 50px;
                        margin: -8px auto;
                        display: block;
                    }
                }
            }

            .scroller {
                height: 100%;
                padding: 0 20px;
                box-sizing: border-box;
            }
        }
    }
}
:global(.m) .achievement-view {
    :global {
        .progress {
            left: 0;
        }
        .page-before {
            flex-direction: column;
            .left {
                display: flex;
                & > * {
                    flex: 1;
                }
                .chk {
                    padding: 0 5px;
                    .el-checkbox.el-checkbox--large .el-checkbox__label {
                        font-size: 12px;
                    }
                }
            }
        }
        article {
            top: 65px;
            left: 0;
        }

        .scroller {
            padding: 0 5px;
        }
    }
}
.scanner-area {
    position: absolute;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.2);
    overflow: hidden;
    z-index: 900;
    :global {
        .scanner-frame {
            width: 100%;
            height: 100%;
            border: 0;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 2;
        }
        .scanner-back {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            .scanner-box {
                max-width: 100%;
                width: 600px;
                height: 650px;
                background: var(--c-white);
                border-radius: 5px;
                margin: 0 auto;
                margin-top: calc(10vh - 60px);
                .scanner-title {
                    height: 40px;
                    line-height: 40px;
                    font-size: 20px;
                    padding-left: 20px;
                    padding-top: 10px;
                }
            }
        }
    }
}
:global(.pc) .scanner-area {
    left: 80px;
}
:global(.m) .scanner-area {
    bottom: 50px;
    :global {
        .scanner-box {
            margin-top: 0;
            height: 100%;
            border-radius: 0;
        }
    }
}
</style>
