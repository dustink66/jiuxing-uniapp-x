import { request } from "./index";
import type { 
  ConsultationPriceConfig, 
  CreateOrderRequest, 
  CreateOrderResponse,
  PaymentStatusResponse
} from "@/types/habit";

export class ConsultationService {
  /**
   * 获取咨询服务价格配置
   */
  static async getPriceConfig(): Promise<ConsultationPriceConfig> {
    return await request({ 
      url: '/consultation/price-config', 
      method: 'GET' 
    });
  }

  /**
   * 创建咨询服务订单
   */
  static async createOrder(data: CreateOrderRequest): Promise<CreateOrderResponse> {
    return await request({ 
      url: '/consultation/create-order', 
      method: 'POST',
      data 
    });
  }

  /**
   * 检查订单支付状态
   */
  static async checkPaymentStatus(orderNo: string): Promise<PaymentStatusResponse> {
    return await request({ 
      url: `/consultation/check-payment-status?order_no=${orderNo}`, 
      method: 'GET'
    });
  }
}
