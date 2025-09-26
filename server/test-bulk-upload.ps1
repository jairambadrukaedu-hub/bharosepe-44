Add-Type -AssemblyName System.Net.Http

$client = New-Object System.Net.Http.HttpClient
$content = New-Object System.Net.Http.MultipartFormDataContent

# Read the CSV file
$csvContent = Get-Content "test-upload.csv" -Raw
$stringContent = New-Object System.Net.Http.StringContent($csvContent, [System.Text.Encoding]::UTF8, "text/csv")
$stringContent.Headers.ContentDisposition = New-Object System.Net.Http.Headers.ContentDispositionHeaderValue("form-data")
$stringContent.Headers.ContentDisposition.Name = '"csvFile"'
$stringContent.Headers.ContentDisposition.FileName = '"test.csv"'

$content.Add($stringContent)

try {
    $response = $client.PostAsync("http://localhost:5000/api/leads/bulk", $content).Result
    $responseContent = $response.Content.ReadAsStringAsync().Result
    Write-Host "Response: $responseContent"
    Write-Host "Status: $($response.StatusCode)"
} catch {
    Write-Host "Error: $_"
} finally {
    $client.Dispose()
}