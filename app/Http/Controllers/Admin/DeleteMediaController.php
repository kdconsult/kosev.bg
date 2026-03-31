<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Spatie\MediaLibrary\MediaCollections\Models\Media;

class DeleteMediaController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'media_id' => ['required', 'integer', 'exists:media,id'],
        ]);

        $media = Media::findOrFail($request->input('media_id'));
        $media->delete();

        return response()->json(['message' => 'Media deleted successfully']);
    }
}
