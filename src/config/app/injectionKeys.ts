import type RideGateway from '@/gateways/RideGateway'
import type { EchoType } from '@/plugins/Echo'
import type { InjectionKey } from 'vue'

export const rideGatewayInjectionKey = Symbol() as InjectionKey<RideGateway>
export const echoInjectionKey = Symbol() as InjectionKey<EchoType>
