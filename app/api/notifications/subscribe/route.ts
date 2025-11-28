import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  try {
    const subscription = await request.json();

    // Here you would typically save the subscription to your database
    // For now, we'll just validate it
    if (!subscription.endpoint || !subscription.keys) {
      return NextResponse.json(
        { error: 'Invalid subscription' },
        { status: 400 }
      );
    }

    // TODO: Save subscription to database
    // await prisma.notificationSetting.update({
    //   where: { userId },
    //   data: { pushSubscription: subscription }
    // });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error subscribing to notifications:', error);
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}

