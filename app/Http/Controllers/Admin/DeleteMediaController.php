<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

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

        $media = \Spatie\MediaLibrary\MediaCollections\Models\Media::findOrFail($request->input('media_id'));
        $media->delete();

        return response()->json(['message' => 'Media deleted successfully']);
    }
}
