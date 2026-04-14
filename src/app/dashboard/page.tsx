import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>Key metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">&mdash;</p>
            <p className="text-sm text-muted-foreground">
              Add your metrics here
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Activity</CardTitle>
            <CardDescription>Recent events</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">&mdash;</p>
            <p className="text-sm text-muted-foreground">
              Add your activity feed here
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
            <CardDescription>Pending items</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">&mdash;</p>
            <p className="text-sm text-muted-foreground">
              Add your task list here
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
