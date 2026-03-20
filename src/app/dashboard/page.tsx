import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Compliance</CardTitle>
            <CardDescription>Upcoming deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">&mdash;</p>
            <p className="text-sm text-muted-foreground">No entities onboarded yet</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meetings</CardTitle>
            <CardDescription>This month</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">&mdash;</p>
            <p className="text-sm text-muted-foreground">No meetings scheduled</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Filings</CardTitle>
            <CardDescription>Pending review</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">&mdash;</p>
            <p className="text-sm text-muted-foreground">No filings in progress</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
