import paramiko
import tarfile
import os

local_dir = r"c:\Users\diego\Desktop\TFG_RestauranteAsiatico\docker\megacrossover"
local_tar = r"c:\Users\diego\Desktop\TFG_RestauranteAsiatico\megacrossover.tar"

print("Creating local tar archive...")
def filter_tar(tarinfo):
    if "node_modules" in tarinfo.name or ".next" in tarinfo.name or ".git" in tarinfo.name:
        return None
    return tarinfo

with tarfile.open(local_tar, "w") as tar:
    tar.add(local_dir, arcname="megacrossover", filter=filter_tar)

print("Connecting to VPS...")
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect('94.72.97.249', username='diego', password='Rsjwvb12_', port=22535, timeout=10, allow_agent=False, look_for_keys=False)

print("Uploading tar archive...")
sftp = client.open_sftp()
sftp.put(local_tar, "/tmp/megacrossover.tar")
sftp.close()

print("Extracting tar archive on VPS...")
stdin, stdout, stderr = client.exec_command("tar -xf /tmp/megacrossover.tar -C /home/diego/TFG_RestauranteAsiatico/docker/")
print(stdout.read().decode())
print(stderr.read().decode())

client.exec_command("rm /tmp/megacrossover.tar")

print("Building and pushing frontend image on VPS...")
cmd = "helm upgrade --install restaruante -f /home/diego/TFG_RestauranteAsiatico/docker/megacrossover/proyecto/personal/restaruante/values.yaml /home/diego/TFG_RestauranteAsiatico/docker/megacrossover/proyecto/personal/restaruante"
stdin, stdout, stderr = client.exec_command(cmd)
print(stdout.read().decode())
print(stderr.read().decode())

print("Done!")
client.close()

if os.path.exists(local_tar):
    try:
        os.remove(local_tar)
    except Exception as e:
        print(f"Error removing local tar: {e}")

