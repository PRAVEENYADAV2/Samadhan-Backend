import CreateUpvote from "@/utils/CreateUpvote"; // adjust if in a different folder

export async function POST(request, { params }) {
    const { issueId, userId } = params;

    if (!issueId || !userId) {
        return new Response(JSON.stringify({ error: "Missing issueId or userId" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const result = await CreateUpvote({ issueId, userId });

    return new Response(JSON.stringify(result), {
        status: result.success ? 200 : 400,
        headers: { "Content-Type": "application/json" },
    });

}
