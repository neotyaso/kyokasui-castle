import { useForm, Link, Head } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        status: 'draft',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.news.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800">
                        お知らせ作成
                    </h2>
                    <div className="flex space-x-2">
                        <Link
                            href={route('admin.news.create')}
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                            新規作成
                        </Link>
                        <Link
                            href={route('dashboard')}
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded text-sm"
                        >
                            ダッシュボードに戻る
                        </Link>
                    </div>
                </div>
            }
        >
            <Head title="お知らせ作成" />
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-2xl font-bold mb-4">お知らせ作成</h1>

                <form onSubmit={submit} className="space-y-4">
                    {/* タイトル */}
                    <div>
                        <label className="block mb-1">タイトル</label>
                        <input
                            type="text"
                            className="w-full border rounded p-2"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                        />
                        {errors.title && (
                            <p className="text-red-600 text-sm">{errors.title}</p>
                        )}
                    </div>

                    {/* 本文 */}
                    <div>
                        <label className="block mb-1">本文</label>
                        <textarea
                            className="w-full border rounded p-2 h-40"
                            value={data.content}
                            onChange={(e) => setData('content', e.target.value)}
                        />
                        {errors.content && (
                            <p className="text-red-600 text-sm">{errors.content}</p>
                        )}
                    </div>
                    <select
                        className="w-full border rounded p-2"
                        value={data.status}
                        onChange={(e) => setData('status', e.target.value)}
                        >
                        <option value="draft">下書き</option>
                        <option value="published">公開</option>
                        <option value="hidden">非表示</option>
                    </select>


                    {/* ボタン */}
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        {processing ? '保存中...' : '保存する'}
                    </button>

                    <Link
                        href={route('admin.news.index')}
                        className="ml-4 text-gray-600 underline"
                    >
                        戻る
                    </Link>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
