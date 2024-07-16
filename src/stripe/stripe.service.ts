import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserCart } from 'src/cart/cart.entity';
import { Repository } from 'typeorm';
import { Stripe } from 'stripe';
import { globalUtils } from 'src/common/utils';

@Injectable()
export class StripeService {
  constructor(
    @InjectRepository(UserCart)
    private usersCartRepository: Repository<UserCart>,
  ) {}

  async createCheckoutSession({
    userId,
  }: {
    userId: number;
  }): Promise<Stripe.Response<Stripe.Checkout.Session>> {
    const cartForUser = await this.usersCartRepository.find({
      where: { userId },
      relations: ['product'],
    });

    if (!!cartForUser.length) {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
      const success_url = `${process.env.NEXT_APP_BASE_URL}/checkout-success`;
      const cancel_url = `${process.env.NEXT_APP_BASE_URL}/checkout-failed`;

      const session = await stripe.checkout.sessions.create({
        line_items: cartForUser.map((item) => {
          return {
            price_data: {
              currency: item.product.currency,
              product_data: { name: item.product.name },
              unit_amount: globalUtils.convertToSubCurrency(item.product.price),
            },
            quantity: +item.quantity,
          };
        }),
        payment_method_types: ['card'],
        mode: 'payment',
        success_url,
        cancel_url,
      });

      return session;
    } else {
      throw new Error('Cart is empty');
    }
  }
}
