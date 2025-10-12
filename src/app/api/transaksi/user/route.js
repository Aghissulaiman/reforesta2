export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get("user_id");

  if (!user_id) {
    return NextResponse.json({ error: "User ID tidak ditemukan" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("transaksi")
    .select("*")
    .eq("user_id", user_id)
    .order("tanggal", { ascending: false });

  if (error) throw error;
  return NextResponse.json(data);
}
