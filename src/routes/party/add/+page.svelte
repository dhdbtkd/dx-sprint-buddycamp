<div class="mt-12 p-3">
	<div class="font-bold my-3">모임 등록</div>
	<div>
		<form>
			<div class="grid gap-6 mb-6 md:grid-cols-2">
				<div>
					<label
						for="first_name"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">모임명</label
					>
					<input
						type="text"
						id="first_name"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="이름"
						required
					/>
				</div>
				<div>
					<label for="website" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>모임목적</label
					>
					<input
						type="text"
						id="website"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="무엇을 위한 모임"
						required
					/>
				</div>
				<div>
					<label
						for="countries"
						class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">위치</label
					>
					<div class="flex">
						<select
							id="countries"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mr-5"
						>
							<option selected>시/도</option>
							<option value="1">개발자</option>
							<option value="2">디자이너</option>
							<option value="3">기획자</option>
						</select>
                        <select
							id="countries"
							class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						>
							<option selected>군/구</option>
							<option value="1">개발자</option>
							<option value="2">디자이너</option>
							<option value="3">기획자</option>
						</select>
					</div>
				</div>
				<div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>모집인원</label
					>
					<input
						type="number"
						id="phone"
						class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="모집인원"
						required
					/>
				</div>
				<div>
					<label for="phone" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
						>모집 포지션</label
					>
					<div class="flex justify-between">
						<div class="flex items-center">
							<input
								id="default-checkbox"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="default-checkbox"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">개발자</label
							>
						</div>
						<div class="flex items-center">
							<input
								id="checked-checkbox"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="checked-checkbox"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">디자이너</label
							>
						</div>
						<div class="flex items-center">
							<input
								id="checked-checkbox"
								type="checkbox"
								value=""
								class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
							/>
							<label
								for="checked-checkbox"
								class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">기획자</label
							>
						</div>
					</div>
				</div>
			</div>
			<button
				type="submit"
				class="text-white bg-sky-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800"
				>등록</button
			>
		</form>
	</div>
</div>
