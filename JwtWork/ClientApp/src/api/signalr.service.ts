import { toast } from 'react-toastify'
import { LogLevel, HubConnection, HubConnectionState, HubConnectionBuilder } from '@microsoft/signalr'

const SIGNALR_CONFIG = {
  messageDelay: 3000,
  baseUrl: '/hubs/users',
  toastIcon: 'info-circle',
  events: {
    login: 'UserLogin',
    logout: 'UserLogout',
    closeConnections: 'CloseAllConnections',
    getConnectionId: 'GetConnectionId',
  },
}

/**
 * SignalR API abstraction layer communication.
 * Configures/manages hub connections (typescript singleton pattern).
 */
class SignalRService {
  private static _signalRService: SignalRService
  private _hubConnection: HubConnection | undefined
  private _connectionId: string | undefined

  private constructor() {
    this.createConnection()
    this.registerOnServerEvents()
  }

  public static get Instance(): SignalRService {
    return this._signalRService || (this._signalRService = new this())
  }

  get connectionId(): string | undefined {
    return this._connectionId
  }
  set connectionId(value: string | undefined) {
    this._connectionId = value
  }

  get connectionState(): HubConnectionState {
    return this._hubConnection?.state ?? HubConnectionState.Disconnected
  }

  public async startConnection(): Promise<void> {
    try {
      await this._hubConnection?.start()
      this.getConnectionId()
      console.assert(this.connectionState === HubConnectionState.Connected)
    } catch (e) {
      console.assert(this.connectionState === HubConnectionState.Disconnected)
      console.error(e)
      setTimeout(() => this.startConnection(), 5000)
    }
  }
  private async getConnectionId(): Promise<void> {
    try {
      this.connectionId = await this._hubConnection?.invoke<string>(SIGNALR_CONFIG.events.getConnectionId)
      console.log(`the connection id is received : ${this.connectionId}`)
    } catch (e) {
      console.error(e)
    }
  }
  private createConnection(): void {
    this._hubConnection = new HubConnectionBuilder()
      .withUrl(SIGNALR_CONFIG.baseUrl)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build()
  }

  private hubToastMessage(message: string, delay: number = SIGNALR_CONFIG.messageDelay): void {
    setTimeout(() => toast.info(message), delay)
  }

  private registerOnServerEvents(): void {
    this._hubConnection?.on(SIGNALR_CONFIG.events.login, () => {
      this.hubToastMessage('A user has logged in (SignalR)')
    })

    this._hubConnection?.on(SIGNALR_CONFIG.events.logout, () => {
      this.hubToastMessage('A user has logged out (SignalR)')
    })

    this._hubConnection?.on(SIGNALR_CONFIG.events.closeConnections, async (reason: string) => {
      try {
        await this._hubConnection?.stop()
        this.hubToastMessage(`All hub connections closed (SignalR) - ${reason}`)
      } catch (e) {
        console.error(e)
      }
    })
  }
}

export const SignalRApi = SignalRService.Instance
