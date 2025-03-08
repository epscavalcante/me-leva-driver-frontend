import type HttpClient from '@/clients/http/HttpClient'

export default interface RideGateway {
  getRides(params?: GetRidesParams): Promise<GetRidesOutput>
  getLatestRides(): Promise<GetLatestRidesOutput>
  getRideDetail(rideId: string): Promise<GetRideDetailOutput>
  acceptRide(rideId: string): Promise<void>
}

export class RideHttpGateway implements RideGateway {
  constructor(private readonly httpClient: HttpClient) {}
  async acceptRide(rideId: string): Promise<void> {
    await this.httpClient.patchJson(`/api/rides/${rideId}/accept`)
  }

  async getRideDetail(rideId: string): Promise<GetRideDetailOutput> {
    const response = await this.httpClient.getJson<GetRideDetailResponse>(`/api/rides/${rideId}`)
    return {
      ...response,
      fromLatitude: Number(response.fromLatitude),
      fromLongitude: Number(response.fromLongitude),
      toLatitude: Number(response.toLatitude),
      toLongitude: Number(response.toLongitude),
    }
  }

  async getLatestRides(): Promise<GetLatestRidesOutput> {
    const response = await this.httpClient.getJson<GetLatestRidesResponse>(`api/rides`, {
      queryParams: {
        page: 1,
        per_age: 2,
        sort_by: 'created_at',
        sort_dir: 'DESC',
      },
    })

    // onde faço a conversão para camelCase
    return {
      items: response.items,
    }
  }

  async getRides(params?: GetRidesParams): Promise<GetRidesOutput> {
    const response = await this.httpClient.getJson<GetRidesResponse>('api/rides', {
      queryParams: {
        page: params?.page,
        status: params?.status,
        sort_by: params?.sortBy,
        sort_dir: params?.sortDir,
      },
    })
    return {
      total: response.total,
      items: response.items,
    }
  }
}

export type RequestRideApiInput = {
  passenger_id: string
  from_latitude: number
  from_longitude: number
  to_latitude: number
  to_longitude: number
}

export type RequestRideInput = {
  passengerId: string
  fromLatitude: number
  fromLongitude: number
  toLatitude: number
  toLongitude: number
}

export type RequestRideOutput = {
  rideId: string
}

export type RequestRideApiOutput = {
  ride_id: string
}

export type GetRidesParams = {
  page?: number
  perPage?: number
  status?: string
  sortBy?: string
  sortDir?: 'DESC' | 'ASC'
}

export type GetLatestRidesOutput = {
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetLatestRidesResponse = {
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetRidesOutput = {
  total: number
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetRidesResponse = {
  total: number
  items: {
    rideId: string
    fromLatitude: string
    fromLongitude: string
    toLatitude: string
    toLongitude: string
    driverId: string
    driverName: string
    passengerId: string
    passengerName: string
    status: string
    distance: number
    fare: number
  }[]
}

export type GetRideDetailOutput = {
  rideId: string
  fromLatitude: number
  fromLongitude: number
  toLatitude: number
  toLongitude: number
  driverId: string
  driverName: string
  passengerId: string
  passengerName: string
  status: string
  distance: number
  fare: number
  positions: { latitude: string; longitude: string }[]
}

export type GetRideDetailResponse = {
  rideId: string
  fromLatitude: string
  fromLongitude: string
  toLatitude: string
  toLongitude: string
  driverId: string
  driverName: string
  passengerId: string
  passengerName: string
  status: string
  distance: number
  fare: number
  positions: { latitude: string; longitude: string }[]
}
