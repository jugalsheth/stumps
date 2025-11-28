import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function MatchNotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle>Match Not Found</CardTitle>
          <CardDescription>The match you're looking for doesn't exist</CardDescription>
        </CardHeader>
        <CardContent>
          <Button asChild>
            <Link href="/matches">View All Matches</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

