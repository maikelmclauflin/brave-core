import { ChartTimelineObjectType } from '../constants/types'
import { getLocale } from 'components/common/locale'

export const ChartTimelineOptions: ChartTimelineObjectType[] = [
  {
    name: getLocale('braveWalletUiChartLive'),
    id: 0
  },
  {
    name: getLocale('braveWalletUiChartOneDay'),
    id: 1
  },
  {
    name: getLocale('braveWalletUiChartOneWeek'),
    id: 2
  },
  {
    name: getLocale('braveWalletUiChartOneMonth'),
    id: 3
  },
  {
    name: getLocale('braveWalletUiChartThreeMonths'),
    id: 4
  },
  {
    name: getLocale('braveWalletUiChartOneYear'),
    id: 5
  },
  {
    name: getLocale('braveWalletUiChartAllTime'),
    id: 6
  }
]
